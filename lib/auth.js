import { createUser, getUserByGoogleId } from './db';

// Using require to avoid webpack bundling issues
const GoogleProvider = require('next-auth/providers/google').default;

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || 'placeholder',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder',
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    // Create or update user in database
                    await createUser(
                        account.providerAccountId,
                        user.email,
                        user.name,
                        user.image
                    );
                    return true;
                } catch (error) {
                    console.error('Error during sign in:', error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            // Add user ID to session
            if (token.sub) {
                try {
                    const user = await getUserByGoogleId(token.sub);
                    if (user) {
                        session.user.id = user.id;
                        session.user.dbId = user.id;
                    }
                } catch (error) {
                    console.error('Error in session callback:', error);
                }
            }
            return session;
        },
        async jwt({ token, account }) {
            // Store Google ID in token
            if (account) {
                token.sub = account.providerAccountId;
            }
            return token;
        },
    },
    pages: {
        signIn: '/',
    },
    secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
};
