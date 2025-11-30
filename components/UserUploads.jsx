'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function UserUploads() {
    const { data: session } = useSession();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            if (!session) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/videos/my-uploads');
                if (response.ok) {
                    const data = await response.json();
                    setVideos(data);
                }
            } catch (error) {
                console.error('Error fetching user videos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, [session]);

    if (!session) {
        return null;
    }

    if (loading) {
        return <p style={{ color: '#fff', textAlign: 'center' }}>Loading your uploads...</p>;
    }

    if (videos.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                <p>You haven&apos;t uploaded any videos yet.</p>
            </div>
        );
    }

    const getStatusBadge = (status) => {
        const styles = {
            pending: { background: '#FFA726', color: '#000' },
            approved: { background: '#66BB6A', color: '#fff' },
            rejected: { background: '#EF5350', color: '#fff' }
        };

        return (
            <span style={{
                ...styles[status],
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }}>
                {status}
            </span>
        );
    };

    return (
        <div style={{ marginTop: '40px' }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Your Uploads</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
                {videos.map((video) => (
                    <div
                        key={video.id}
                        style={{
                            background: '#1a1a1a',
                            border: '2px solid #333',
                            borderRadius: '12px',
                            padding: '20px',
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'start'
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>{video.title}</h3>
                                {getStatusBadge(video.status)}
                            </div>
                            <p style={{ color: '#888', fontSize: '14px', margin: '5px 0' }}>
                                Map: {video.map_name}
                            </p>
                            <p style={{ color: '#666', fontSize: '12px', margin: '5px 0' }}>
                                Uploaded: {new Date(video.created_at).toLocaleDateString()}
                            </p>
                            {video.status === 'rejected' && video.rejection_reason && (
                                <div style={{
                                    marginTop: '10px',
                                    padding: '10px',
                                    background: '#2a1a1a',
                                    borderLeft: '3px solid #EF5350',
                                    borderRadius: '4px'
                                }}>
                                    <p style={{ color: '#EF5350', fontSize: '14px', margin: 0 }}>
                                        Rejection reason: {video.rejection_reason}
                                    </p>
                                </div>
                            )}
                        </div>
                        {video.status === 'approved' && (
                            <video
                                src={video.blob_url}
                                style={{ width: '200px', borderRadius: '8px' }}
                                controls
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
