import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { filename } = await request.json();

        // Generate a unique filename
        const uniqueFilename = `videos/${Date.now()}-${filename}`;

        // Return the filename for client-side upload
        return NextResponse.json({
            filename: uniqueFilename
        });
    } catch (error) {
        console.error('Error generating upload filename:', error);
        return NextResponse.json({ error: 'Failed to generate filename' }, { status: 500 });
    }
}
