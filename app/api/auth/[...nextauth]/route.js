import { authOptions } from '@/lib/auth';

// Using require to avoid webpack bundling issues
const NextAuth = require('next-auth').default;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const runtime = 'nodejs';
