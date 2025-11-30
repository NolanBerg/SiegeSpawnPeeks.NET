'use client';

import { useEffect, useState } from 'react';

export default function AdminModerationQueue() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moderating, setModerating] = useState(null);

    useEffect(() => {
        fetchPendingVideos();
    }, []);

    async function fetchPendingVideos() {
        try {
            const response = await fetch('/api/admin/pending');
            if (response.ok) {
                const data = await response.json();
                setVideos(data);
            } else if (response.status === 403) {
                alert('Access denied. Admin privileges required.');
            }
        } catch (error) {
            console.error('Error fetching pending videos:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleModerate(videoId, action) {
        let reason = null;
        if (action === 'reject') {
            reason = prompt('Please provide a reason for rejection:');
            if (!reason) return;
        }

        setModerating(videoId);

        try {
            const response = await fetch('/api/admin/moderate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoId, action, reason })
            });

            if (response.ok) {
                // Remove moderated video from list
                setVideos(videos.filter(v => v.id !== videoId));
                alert(`Video ${action}d successfully!`);
            } else {
                alert('Failed to moderate video');
            }
        } catch (error) {
            console.error('Error moderating video:', error);
            alert('Error moderating video');
        } finally {
            setModerating(null);
        }
    }

    if (loading) {
        return <p style={{ color: '#fff', textAlign: 'center' }}>Loading pending videos...</p>;
    }

    if (videos.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                <p>No pending videos to moderate.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>
                Pending Videos ({videos.length})
            </h2>
            <div style={{ display: 'grid', gap: '30px' }}>
                {videos.map((video) => (
                    <div
                        key={video.id}
                        style={{
                            background: '#1a1a1a',
                            border: '2px solid #333',
                            borderRadius: '12px',
                            padding: '25px',
                            display: 'grid',
                            gridTemplateColumns: '1fr 400px',
                            gap: '30px'
                        }}
                    >
                        <div>
                            <h3 style={{ color: '#fff', marginBottom: '15px' }}>{video.title}</h3>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ color: '#888', marginRight: '15px' }}>
                                    <strong>Map:</strong> {video.map_name}
                                </span>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>
                                    <strong>Uploaded by:</strong> {video.uploader_name} ({video.uploader_email})
                                </span>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ color: '#666', fontSize: '14px' }}>
                                    {new Date(video.created_at).toLocaleString()}
                                </span>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <span style={{ color: '#666', fontSize: '14px' }}>
                                    File: {video.filename} ({(video.file_size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                <button
                                    onClick={() => handleModerate(video.id, 'approve')}
                                    disabled={moderating === video.id}
                                    style={{
                                        padding: '12px 30px',
                                        background: moderating === video.id ? '#555' : '#4CAF50',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        cursor: moderating === video.id ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✓ Approve
                                </button>
                                <button
                                    onClick={() => handleModerate(video.id, 'reject')}
                                    disabled={moderating === video.id}
                                    style={{
                                        padding: '12px 30px',
                                        background: moderating === video.id ? '#555' : '#EF5350',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        cursor: moderating === video.id ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✗ Reject
                                </button>
                            </div>
                        </div>

                        <div>
                            <video
                                src={video.blob_url}
                                controls
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    border: '2px solid #444'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
