# 🚀 Deployment Guide for SiegeSpawnPeeks.NET

This guide will walk you through deploying your upgraded Next.js application with OAuth authentication, video uploads, and admin moderation to Vercel.

## Pre-Deployment Checklist

✅ Next.js migration complete  
✅ All components created  
✅ API routes implemented  
⏳ Environment variables (will be set during deployment)  
⏳ Database setup (will be done on Vercel)  
⏳ Google OAuth credentials (will be created)  

---

## Step 1: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted:
   - User Type: External
   - App name: Siege Spawn Peeks
   - User support email: your email
   - Developer contact: your email
6. Application type: **Web application**
7. Name: Siege Spawn Peeks
8. **Authorized redirect URIs** - Add both:
   - `http://localhost:3000/api/auth/callback/google` (for local testing)
   - `https://siegespawnpeeks.net/api/auth/callback/google` (for production)
9. Click **Create**
10. **Save the Client ID and Client Secret** - you'll need these!

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. **Framework Preset**: Next.js (should auto-detect)
5. **Root Directory**: `./`
6. Click **Deploy** (it will fail initially - that's okay, we need to add environment variables)

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## Step 3: Add Vercel Postgres Database

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database** → **Postgres**
3. Name: `siegespawnpeeks-db`
4. Region: Choose closest to your users
5. Click **Create**
6. Vercel will automatically add these environment variables to your project:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

---

## Step 4: Run Database Schema

1. In your Vercel Postgres dashboard, click **Query** tab
2. Copy the contents of `scripts/setup-db.sql`
3. Paste into the query editor
4. Click **Run Query**
5. Verify tables were created successfully

---

## Step 5: Add Vercel Blob Storage

1. In your Vercel project, go to **Storage** tab
2. Click **Create Database** → **Blob**
3. Name: `siegespawnpeeks-videos`
4. Click **Create**
5. Vercel will automatically add `BLOB_READ_WRITE_TOKEN` to your environment variables

---

## Step 6: Configure Environment Variables

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add the following variables:

### NextAuth Configuration

```
NEXTAUTH_URL=https://siegespawnpeeks.net
NEXTAUTH_SECRET=<generate this>
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Google OAuth

```
GOOGLE_CLIENT_ID=<from Step 1>
GOOGLE_CLIENT_SECRET=<from Step 1>
```

### Vercel Blob (Public Token for Client-Side Upload)

```
NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN=<same as BLOB_READ_WRITE_TOKEN>
```

> **Note**: The `NEXT_PUBLIC_` prefix makes it available to the frontend for client-side uploads.

3. Click **Save** for each variable
4. Redeploy your app: **Deployments** → Click latest deployment → **Redeploy**

---

## Step 7: Make Yourself Admin

After your first login:

1. Go to Vercel Postgres → **Data** tab
2. Find your user ID in the `users` table
3. Copy your `id` value
4. Go to **Query** tab and run:

```sql
INSERT INTO admins (user_id) VALUES (<your_user_id>);
```

Example:
```sql
INSERT INTO admins (user_id) VALUES (1);
```

5. You now have admin access!

---

## Step 8: Test Everything

### Test Authentication
1. Visit your deployed site
2. Click the user icon in the header
3. Sign in with Google
4. Verify your profile picture appears

### Test Video Upload
1. Click your profile → **Upload Video**
2. Fill inthe form:
   - Title: Test Peek
   - Map: Bank
   - Upload a small video file
3. Click **Upload Video**
4. Verify it appears in "Your Uploads" with **PENDING** status

### Test Admin Moderation
1. Click your profile → **Admin Panel**
2. You should see your test video
3. Click **Approve**
4. Go to the Bank map page
5. Verify your video appears under "Community Submissions"

### Test Rejection Flow
1. Upload another test video
2. In admin panel, click **Reject**
3. Enter a reason (e.g., "Test rejection")
4. Go to Upload page → Your Uploads
5. Verify the rejection reason is displayed

---

## Step 9: Update Your Domain Settings

If you're using a custom domain (siegespawnpeeks.net):

1. Make sure your domain is connected in Vercel
2. Update Google OAuth redirect URI to use your domain
3. Update `NEXTAUTH_URL` to your domain
4. Redeploy

---

## Local Development Setup

To run locally for development:

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in all the values from your Vercel dashboard

3. Update Google OAuth redirect URI to include:
   - `http://localhost:3000/api/auth/callback/google`

4. Run development server:
```bash
npm run dev
```

5. Visit `http://localhost:3000`

---

## Troubleshooting

### "OAuth Error: Invalid Redirect URI"
- Double-check your Google OAuth redirect URIs match exactly
- Make sure `NEXTAUTH_URL` in Vercel matches your domain

### "Database Connection Error"
- Verify Vercel Postgres environment variables are set
- Check if database was created successfully
- Try redeploying

### "403 Forbidden on Admin Panel"
- Make sure you added yourself to the `admins` table
- Check that your user ID is correct

### "Upload Failed"
- Verify `NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN` is set
- Check file size is under 100MB
- Ensure Vercel Blob storage was created

### Videos Not Appearing After Approval
- Check database: `SELECT * FROM videos WHERE status='approved';`
- Verify map name in database matches URL format (e.g., "bank", not "Bank")
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)

---

## Production Tips

1. **Monitor Your Database**: Vercel Postgres has storage limits on free tier
2. **Set File Size Limits**: Current limit is 100MB, adjust in `VideoUploadForm.jsx` if needed
3. **Add More Maps**: Update the maps array in both `VideoUploadForm.jsx` and `MapDropdown.jsx`
4. **Email Notifications**: Consider adding email notifications when videos are uploaded/moderated
5. **Analytics**: Track upload success rates and moderation times

---

## Next Steps

- [ ] Test deployment thoroughly
- [ ] Moderate any pending videos
- [ ] Announce the new upload feature to your users
- [ ] Monitor for spam/inappropriate uploads
- [ ] Consider adding Discord OAuth as alternative login

---

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vercel Support](https://vercel.com/support)

🎮 Happy hunting, and good luck with your spawn peeks!
