import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { moderateVideo, isUserAdmin } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        const isAdmin = await isUserAdmin(session.user.dbId);
        if (!isAdmin) {
            return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
        }

        const { videoId, action, reason } = await request.json();

        if (!videoId || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (action !== 'approve' && action !== 'reject') {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        const video = await moderateVideo(videoId, action, session.user.dbId, reason);

        return NextResponse.json({ success: true, video });
    } catch (error) {
        console.error('Error moderating video:', error);
        return NextResponse.json({ error: 'Failed to moderate video' }, { status: 500 });
    }
}
