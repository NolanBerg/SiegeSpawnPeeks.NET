import { NextResponse } from 'next/server';
import { getVideosByMapAndStatus } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const map = searchParams.get('map');

        if (!map) {
            return NextResponse.json({ error: 'Map parameter required' }, { status: 400 });
        }

        const videos = await getVideosByMapAndStatus(map, 'approved');

        return NextResponse.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
