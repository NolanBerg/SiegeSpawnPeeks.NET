import './globals.css';
import './index.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
    title: 'Siege Spawn Peeks',
    description: 'Rainbow Six Siege spawn peek videos and tactics',
    keywords: ['Rainbow Six Siege', 'spawn peeks', 'R6', 'tactics', 'gameplay'],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                    <Analytics />
                    <SpeedInsights />
                </AuthProvider>
            </body>
        </html>
    );
}
