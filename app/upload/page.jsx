'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import VideoUploadForm from '@/components/VideoUploadForm';
import UserUploads from '@/components/UserUploads';

export default function UploadPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a'
            }}>
                <p style={{ color: '#fff' }}>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0a',
                padding: '20px'
            }}>
                <h1 style={{ color: '#fff', marginBottom: '20px' }}>Please Sign In</h1>
                <p style={{ color: '#888', marginBottom: '30px' }}>
                    You need to be logged in to upload videos.
                </p>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        padding: '15px 30px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    Go to Home Page
                </button>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        marginBottom: '30px',
                        padding: '10px 20px',
                        background: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    ← Back to Home
                </button>

                <VideoUploadForm />
                <UserUploads />
            </div>
        </div>
    );
}
