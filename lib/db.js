import { sql } from '@vercel/postgres';

// Check if we're in a build environment
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

// Helper to skip database operations during build
function safeQuery(queryFn) {
    return async (...args) => {
        if (isBuildTime || !process.env.POSTGRES_URL) {
            console.log('Skipping database query during build');
            return null;
        }
        return queryFn(...args);
    };
}

export async function createUser(googleId, email, name, profilePicture) {
    if (isBuildTime || !process.env.POSTGRES_URL) return null;
    try {
        const result = await sql`
      INSERT INTO users (google_id, email, name, profile_picture)
      VALUES (${googleId}, ${email}, ${name}, ${profilePicture})
      ON CONFLICT (google_id) 
      DO UPDATE SET 
        email = ${email},
        name = ${name},
        profile_picture = ${profilePicture}
      RETURNING *
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error creating/updating user:', error);
        throw error;
    }
}

export async function getUserByGoogleId(googleId) {
    if (isBuildTime || !process.env.POSTGRES_URL) return null;
    try {
        const result = await sql`
      SELECT * FROM users WHERE google_id = ${googleId}
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function getUserById(userId) {
    try {
        const result = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null;
    }
}

export async function isUserAdmin(userId) {
    try {
        const result = await sql`
      SELECT * FROM admins WHERE user_id = ${userId}
    `;
        return result.rows.length > 0;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

export async function createVideo(userId, blobUrl, filename, fileSize, title, mapName) {
    try {
        const result = await sql`
      INSERT INTO videos (user_id, blob_url, filename, file_size, title, map_name, status)
      VALUES (${userId}, ${blobUrl}, ${filename}, ${fileSize}, ${title}, ${mapName}, 'pending')
      RETURNING *
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error creating video:', error);
        throw error;
    }
}

export async function getVideosByMapAndStatus(mapName, status = 'approved') {
    try {
        const result = await sql`
      SELECT v.*, u.name as uploader_name, u.email as uploader_email
      FROM videos v
      JOIN users u ON v.user_id = u.id
      WHERE v.map_name = ${mapName} AND v.status = ${status}
      ORDER BY v.created_at DESC
    `;
        return result.rows;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

export async function getUserVideos(userId) {
    try {
        const result = await sql`
      SELECT * FROM videos 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
        return result.rows;
    } catch (error) {
        console.error('Error fetching user videos:', error);
        return [];
    }
}

export async function getPendingVideos() {
    try {
        const result = await sql`
      SELECT v.*, u.name as uploader_name, u.email as uploader_email
      FROM videos v
      JOIN users u ON v.user_id = u.id
      WHERE v.status = 'pending'
      ORDER BY v.created_at ASC
    `;
        return result.rows;
    } catch (error) {
        console.error('Error fetching pending videos:', error);
        return [];
    }
}

export async function moderateVideo(videoId, action, moderatorId, rejectionReason = null) {
    try {
        const status = action === 'approve' ? 'approved' : 'rejected';
        const result = await sql`
      UPDATE videos
      SET status = ${status},
          moderated_at = NOW(),
          moderated_by = ${moderatorId},
          rejection_reason = ${rejectionReason}
      WHERE id = ${videoId}
      RETURNING *
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error moderating video:', error);
        throw error;
    }
}
