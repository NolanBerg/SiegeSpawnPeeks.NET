## Siege Spawn Peeks

Site for browsing and sharing Rainbow Six Siege spawn peek clips. You can watch curated YouTube videos organized by map, or upload your own clips that will be reviewed before upload.

Live at https://www.siegespawnpeeks.net

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Auth: NextAuth.js with Google OAuth
- Database: Neon Postgres (Serverless)
- Storage: Vercel Blob
- Deployment: Vercel
- Frontend: React

---

## Project Structure

```
SiegeSpawnPeeks.NET/
├── app/                           # Next.js App Router
│   ├── layout.jsx
│   ├── page.jsx
│   ├── upload/page.jsx
│   ├── admin/page.jsx
│   ├── map/[mapName]/page.jsx
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── upload/
│       │   ├── get-upload-url/
│       │   └── complete/
│       ├── videos/
│       │   ├── route.js
│       │   └── my-uploads/
│       └── admin/
│           ├── pending/
│           └── moderate/
├── components/
├── lib/
│   ├── auth.js
│   └── db.js
├── scripts/
│   └── setup-db.sql
└── public/
```

---

## License

MIT — created by [Nolan Berg](https://github.com/NolanBerg)
