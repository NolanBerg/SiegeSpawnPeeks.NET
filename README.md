# 🎮 Siege Spawn Peeks

A community-driven platform for sharing and discovering Rainbow Six Siege spawn peek locations. Users can browse curated YouTube videos and upload their own spawn peek videos for admin review.

🌐 **Live Site**: [www.siegespawnpeeks.net](https://www.siegespawnpeeks.net)

---

## 🚀 Features

- **🗺️ Interactive Map Browser** - Browse spawn peeks for all R6S maps
- **🎥 Community Uploads** - Users can upload their own spawn peek videos
- **👤 Google OAuth Authentication** - Secure sign-in with Google
- **⚖️ Admin Moderation** - Review and approve/reject user submissions
- **📊 User Dashboard** - Track your uploaded videos and their status
- **☁️ Cloud Storage** - Videos stored on Vercel Blob (up to 100MB)
- **💾 PostgreSQL Database** - Neon serverless Postgres for data storage

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth
- **Database**: [Neon Postgres](https://neon.tech/) (Serverless)
- **File Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Deployment**: [Vercel](https://vercel.com/)
- **Styling**: Vanilla CSS
- **Icons**: Font Awesome
- **Video Player**: HTML5 native video player

---

## 📁 Project Structure

```
SiegeSpawnPeeks.NET/
├── app/                           # Next.js App Router
│   ├── layout.jsx                 # Root layout with auth provider
│   ├── page.jsx                   # Home page
│   ├── upload/page.jsx            # Video upload page
│   ├── admin/page.jsx             # Admin moderation dashboard
│   ├── map/[mapName]/page.jsx     # Dynamic map detail pages
│   └── api/                       # API routes
│       ├── auth/[...nextauth]/    # NextAuth authentication
│       ├── upload/                # Upload endpoints
│       │   ├── get-upload-url/    # Generate unique filename
│       │   └── complete/          # Save video metadata
│       ├── videos/                # Video retrieval
│       │   ├── route.js           # Get approved videos by map
│       │   └── my-uploads/        # Get user's uploads
│       └── admin/                 # Admin endpoints
│           ├── pending/           # Get pending videos
│           └── moderate/          # Approve/reject videos
├── components/                    # Reusable React components
│   ├── AdminModerationQueue.jsx   # Admin video review UI
│   ├── AuthProvider.jsx           # NextAuth session provider
│   ├── LoginButton.jsx            # User profile dropdown
│   ├── MapDropdown.jsx            # Map search/select
│   ├── Modal.jsx                  # Modal dialog
│   ├── UserUploads.jsx            # User's upload history
│   └── VideoUploadForm.jsx        # Video upload form
├── lib/                           # Utility functions
│   ├── auth.js                    # NextAuth configuration
│   └── db.js                      # Database queries
├── scripts/                       # Setup scripts
│   └── setup-db.sql               # Database schema
├── public/                        # Static assets
│   └── images/                    # Logo and icons
├── .env.example                   # Environment variables template
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies
└── vercel.json                 # Vercel deployment config
```

---

## 🎯 How It Works

### Authentication Flow

1. User clicks "Sign in with Google"
2. NextAuth.js redirects to Google OAuth
3. User authorizes the app
4. Google redirects back with authorization code
5. NextAuth creates a session
6. User data is stored/updated in `users` table
7. Session includes user ID for API requests

### Video Upload Flow

1. **User submits form** with video file, title, and map selection
2. **Client-side validation** checks file type (mp4/mov/webm) and size (≤100MB)
3. **API authentication** verifies user session
4. **Direct upload** to Vercel Blob from browser (bypasses API size limits)
5. **Metadata saved** to database with status "pending"
6. **User sees confirmation** and video appears in their upload history

### Admin Moderation Flow

1. **Admin accesses** `/admin` page (protected route)
2. **API checks** if user is in `admins` table
3. **Pending videos** are fetched with uploader info
4. **Admin reviews** video with inline player
5. **Approve** → Video status changes to "approved", appears on map pages
6. **Reject** → Video status changes to "rejected", reason saved for user

### Video Display Flow

1. **User visits map page** (e.g., `/map/bank`)
2. **API fetches** approved videos for that map from database
3. **Videos rendered** alongside curated YouTube content
4. **HTML5 player** streams video directly from Vercel Blob

---

## 🔧 Local Development Setup

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Google Cloud Console** account
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/NolanBerg/SiegeSpawnPeeks.NET.git
cd SiegeSpawnPeeks.NET
npm install
```

### Step 2: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen:
   - User Type: **External**
   - App name: **Siege Spawn Peeks**
   - Add your email for support and developer contact
6. Create OAuth Client:
   - Application type: **Web application**
   - Name: **Siege Spawn Peeks (Local Dev)**
   - Authorized redirect URIs:
     ```
     http://localhost:3001/api/auth/callback/google
     https://www.siegespawnpeeks.net/api/auth/callback/google
     ```
7. **Copy the Client ID and Client Secret**

### Step 3: Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Google OAuth (from Step 2)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Vercel Blob (optional for local dev, leave empty to test UI only)
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN=

# Database (optional for local dev, leave empty to test UI only)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3001**

> **Note**: Without database/blob storage configured, you can test the UI and authentication, but uploads won't save.

---

## 🗄️ Database Setup

### Schema Overview

The application uses three main tables:

**`users`** - Stores user accounts from Google OAuth
- `id` (Primary Key)
- `google_id` (Unique identifier from Google)
- `email`, `name`, `profile_picture`
- `created_at`

**`admins`** - Tracks which users have admin permissions
- `id` (Primary Key)
- `user_id` (Foreign Key → users.id)
- `created_at`

**`videos`** - Stores uploaded video metadata
- `id` (Primary Key)
- `user_id` (Foreign Key → users.id)
- `blob_url` (URL to video in Vercel Blob)
- `filename`, `file_size`, `title`, `map_name`
- `status` (pending/approved/rejected)
- `rejection_reason`
- `created_at`, `moderated_at`, `moderated_by`

### Production Database (Neon)

The production database is hosted on [Neon](https://neon.tech/), a serverless Postgres platform.

**To set up the database:**

1. Access Neon Console from Vercel dashboard (Storage → Database)
2. Open SQL Editor
3. Run the schema from `scripts/setup-db.sql`:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  profile_picture TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  blob_url TEXT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_size BIGINT,
  title VARCHAR(255) NOT NULL,
  map_name VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  moderated_at TIMESTAMP,
  moderated_by INTEGER REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_map_name ON videos(map_name, status);
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
```

### Making Yourself Admin

After your first login:

1. Go to Neon SQL Editor
2. Find your user ID: `SELECT * FROM users;`
3. Grant admin access: `INSERT INTO admins (user_id) VALUES (1);`

Replace `1` with your actual user ID from step 2.

---

## 📤 Video Upload System

### Technologies

- **Client-Side Upload**: Direct upload from browser to Vercel Blob
- **Storage**: Vercel Blob (S3-compatible object storage)
- **Max File Size**: 100MB
- **Supported Formats**: MP4, MOV, WebM
- **Progress Tracking**: Real-time upload progress bar

### Upload Process (Technical)

**1. User Submission**
```javascript
// VideoUploadForm.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setUploading(true);
  
  // Client-side validation
  if (!validateFile(videoFile)) return;
  
  // ... upload process
};
```

**2. Direct Blob Upload**
```javascript
// Upload directly to Vercel Blob
import { put } from '@vercel/blob';

const blob = await put(
  `videos/${Date.now()}-${file.name}`,
  file,
  {
    access: 'public',
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN
  }
);
```

**3. Save Metadata**
```javascript
// Call API to save to database
const response = await fetch('/api/upload/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    blobUrl: blob.url,
    filename: file.name,
    fileSize: file.size,
    title,
    mapName
  })
});
```

**4. Database Insert**
```javascript
// lib/db.js
export async function createVideo(userId, blobUrl, filename, fileSize, title, mapName) {
  const result = await sql`
    INSERT INTO videos (user_id, blob_url, filename, file_size, title, map_name, status)
    VALUES (${userId}, ${blobUrl}, ${filename}, ${fileSize}, ${title}, ${mapName}, 'pending')
    RETURNING *
  `;
  return result.rows[0];
}
```

### Why Direct Upload?

Uploading through API routes has a **4.5MB limit** on Vercel. Direct client-side upload to Blob storage:
- ✅ Bypasses API payload limits
- ✅ Supports files up to 100MB
- ✅ Faster (no server intermediary)
- ✅ Shows real-time progress

---

## 🔐 Authentication Details

### NextAuth.js Configuration

**Google Provider Setup** (`lib/auth.js`):

```javascript
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Create/update user in database
      await createUser(
        account.providerAccountId,
        user.email,
        user.name,
        user.image
      );
      return true;
    },
    async session({ session, token }) {
      // Add database user ID to session
      const user = await getUserByGoogleId(token.sub);
      session.user.dbId = user.id;
      return session;
    },
  },
};
```

### Session Management

Sessions are handled by NextAuth.js:
- **JWT-based** sessions (stateless)
- **Session includes**: Email, name, profile picture, database user ID
- **Expires**: Based on NextAuth defaults (30 days)
- **Refresh**: Automatic on page load

### Protected Routes

**Client-Side Protection** (e.g., Upload page):
```javascript
const { data: session, status } = useSession();

if (status === 'loading') return <Loading />;
if (!session) return <SignInPrompt />;

return <UploadForm />;
```

**API Route Protection**:
```javascript
import { getServerSession } from 'next-auth';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // ... handle request
}
```

**Admin Protection**:
```javascript
const isAdmin = await isUserAdmin(session.user.dbId);
if (!isAdmin) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

---

## 🚀 Deployment to Vercel

### Prerequisites

- Vercel account
- GitHub repository
- Google OAuth credentials configured

### Deployment Steps

**1. Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**2. Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Click **Deploy**

**3. Add Neon Database**
- In Vercel project → **Storage** → **Create Database**
- Choose **Neon** from marketplace
- Name: `siegespawnpeeks-db`
- Environments: Check all (Development, Preview, Production)
- Custom Prefix: **`POSTGRES`** (not STORAGE)
- Click **Create**

**4. Run Database Schema**
- Go to Neon Console (link in Vercel)
- Open SQL Editor
- Copy/paste contents of `scripts/setup-db.sql`
- Click **Run**

**5. Add Blob Storage**
- In Vercel project → **Storage** → **Create**
- Choose **Blob**
- Name: `siegespawnpeeks-videos`
- Click **Create**

**6. Configure Environment Variables**

In Vercel → **Settings** → **Environment Variables**, add:

```
NEXTAUTH_URL=https://www.siegespawnpeeks.net
NEXTAUTH_SECRET=<your-secret>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN=<copy from BLOB_READ_WRITE_TOKEN>
```

Make sure to check all three environments (Production, Preview, Development) for each variable.

**7. Update Google OAuth**

Add production redirect URI to Google Cloud Console:
```
https://www.siegespawnpeeks.net/api/auth/callback/google
```

**8. Redeploy**

Click **Redeploy** in Vercel dashboard to apply environment variables.

**9. Make Yourself Admin**

After first sign-in:
1. Go to Neon SQL Editor
2. `SELECT * FROM users;` (find your ID)
3. `INSERT INTO admins (user_id) VALUES (<your-id>);`

---

## 🌍 Environment Variables Reference

| Variable | Description | Required | Where to Get |
|----------|-------------|----------|--------------|
| `NEXTAUTH_URL` | Your app's URL | ✅ | Your domain or Vercel URL |
| `NEXTAUTH_SECRET` | Secret for session encryption | ✅ | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | OAuth client ID | ✅ | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret | ✅ | Google Cloud Console |
| `POSTGRES_URL` | Database connection string | ✅ | Auto-added by Neon |
| `POSTGRES_PRISMA_URL` | Prisma-compatible URL | ✅ | Auto-added by Neon |
| `POSTGRES_URL_NON_POOLING` | Direct connection | ✅ | Auto-added by Neon |
| `BLOB_READ_WRITE_TOKEN` | Blob storage token (server) | ✅ | Auto-added by Vercel Blob |
| `NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN` | Blob token (client) | ✅ | Copy from BLOB_READ_WRITE_TOKEN |

---

## 🧪 Testing

### Local Testing

```bash
npm run dev
```

Test these flows:
- ✅ Sign in with Google
- ✅ Browse map pages
- ✅ Upload video (if DB configured)
- ✅ View upload history
- ✅ Admin moderation (if admin)

### Production Testing

After deployment:
1. Visit your live site
2. Sign in with Google
3. Upload a test video
4. Access admin panel
5. Approve/reject the video
6. Verify it appears on map page

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [Neon Documentation](https://neon.tech/docs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎮 Credits

Created by [Nolan Berg](https://github.com/NolanBerg)

Rainbow Six Siege is a trademark of Ubisoft Entertainment.
