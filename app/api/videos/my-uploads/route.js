import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserVideos } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const videos = await getUserVideos(session.user.dbId);

        return NextResponse.json(videos);
    } catch (error) {
        console.error('Error fetching user videos:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
