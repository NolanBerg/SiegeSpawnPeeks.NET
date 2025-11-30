'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminModerationQueue from '@/components/AdminModerationQueue';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function checkAdminStatus() {
            if (!session) {
                setChecking(false);
                return;
            }

            try {
                const response = await fetch('/api/admin/pending');
                if (response.ok) {
                    setIsAdmin(true);
                } else if (response.status === 403) {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setChecking(false);
            }
        }

        checkAdminStatus();
    }, [session]);

    if (status === 'loading' || checking) {
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
                <h1 style={{ color: '#fff', marginBottom: '20px' }}>Admin Access Required</h1>
                <p style={{ color: '#888', marginBottom: '30px' }}>
                    Please sign in to access the admin panel.
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

    if (!isAdmin) {
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
                <h1 style={{ color: '#fff', marginBottom: '20px' }}>Access Denied</h1>
                <p style={{ color: '#888', marginBottom: '30px' }}>
                    You don&apos;t have admin privileges.
                </p>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        padding: '15px 30px',
                        background: '#333',
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
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ color: '#fff', margin: 0 }}>Admin Moderation Panel</h1>
                    <button
                        onClick={() => router.push('/')}
                        style={{
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
                </div>

                <AdminModerationQueue />
            </div>
        </div>
    );
}
