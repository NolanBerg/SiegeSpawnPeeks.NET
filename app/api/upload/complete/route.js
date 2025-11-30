import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createVideo } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { blobUrl, filename, fileSize, title, mapName } = await request.json();

        // Validate required fields
        if (!blobUrl || !filename || !title || !mapName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create video record in database
        const video = await createVideo(
            session.user.dbId,
            blobUrl,
            filename,
            fileSize,
            title,
            mapName
        );

        return NextResponse.json({
            success: true,
            video
        });
    } catch (error) {
        console.error('Error completing upload:', error);
        return NextResponse.json({ error: 'Failed to save video' }, { status: 500 });
    }
}
