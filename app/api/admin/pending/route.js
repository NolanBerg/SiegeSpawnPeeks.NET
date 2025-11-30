import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPendingVideos, isUserAdmin } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request) {
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

        const videos = await getPendingVideos();

        return NextResponse.json(videos);
    } catch (error) {
        console.error('Error fetching pending videos:', error);
        return NextResponse.json({ error: 'Failed to fetch pending videos' }, { status: 500 });
    }
}
