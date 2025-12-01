#  Siege Spawn Peeks

A community-driven platform for sharing and discovering Rainbow Six Siege spawn peek locations. Users can browse curated YouTube videos and upload their own spawn peek videos for admin review.

🌐 **Live Site**: [www.siegespawnpeeks.net](https://www.siegespawnpeeks.net)

---

##  Features

- ** Interactive Map Browser** - Browse spawn peeks for all R6S maps
- ** Community Uploads** - Users can upload their own spawn peek videos
- ** Google OAuth Authentication** - Secure sign-in with Google
- ** Admin Moderation** - Review and approve/reject user submissions
- ** User Dashboard** - Track your uploaded videos and their status
- ** Cloud Storage** - Videos stored on Vercel Blob (up to 100MB)
- ** PostgreSQL Database** - Neon serverless Postgres for data storage

---

##  Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth
- **Database**: [Neon Postgres](https://neon.tech/) (Serverless)
- **File Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Deployment**: [Vercel](https://vercel.com/)
- **Styling**: Vanilla CSS
- **Icons**: Font Awesome
- **Video Player**: HTML5 native video player

---

##  Project Structure

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

##  How It Works

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

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

##  License

This project is open source and available under the [MIT License](LICENSE).

---

##  Credits

Created by [Nolan Berg](https://github.com/NolanBerg)

Rainbow Six Siege is a trademark of Ubisoft Entertainment.
