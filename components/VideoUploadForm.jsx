'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { put } from '@vercel/blob';

const maps = [
    "Bank", "Border", "Chalet", "Clubhouse", "Coastline", "Consulate",
    "Emerald Plains", "Kafe Dostoyevsky", "Kanal", "Lair", "Nighthaven Labs",
    "Oregon", "Outback", "Skyscraper", "Theme Park", "Villa"
];

export default function VideoUploadForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        mapName: '',
        videoFile: null
    });
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('video/')) {
                setError('Please select a valid video file');
                return;
            }
            // Validate file size (100MB max)
            if (file.size > 100 * 1024 * 1024) {
                setError('File size must be less than 100MB');
                return;
            }
            setFormData({ ...formData, videoFile: file });
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.title || !formData.mapName || !formData.videoFile) {
            setError('Please fill in all fields');
            return;
        }

        if (!session) {
            setError('You must be logged in to upload videos');
            return;
        }

        setUploading(true);
        setUploadProgress(10);

        try {
            // Upload directly to Vercel Blob
            setUploadProgress(30);
            const blob = await put(
                `videos/${Date.now()}-${formData.videoFile.name}`,
                formData.videoFile,
                {
                    access: 'public',
                    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
                }
            );

            setUploadProgress(70);

            // Save metadata to database
            const response = await fetch('/api/upload/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blobUrl: blob.url,
                    filename: formData.videoFile.name,
                    fileSize: formData.videoFile.size,
                    title: formData.title,
                    mapName: formData.mapName.toLowerCase().replace(/\s+/g, '-')
                }),
            });

            setUploadProgress(100);

            if (!response.ok) {
                throw new Error('Failed to save video metadata');
            }

            setSuccess('Video uploaded successfully! It will appear after admin approval.');
            setFormData({ title: '', mapName: '', videoFile: null });

            // Reset file input
            const fileInput = document.getElementById('video-file-input');
            if (fileInput) fileInput.value = '';

            setTimeout(() => {
                router.push('/upload');
            }, 2000);
        } catch (error) {
            console.error('Upload error:', error);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '30px',
            background: '#1a1a1a',
            borderRadius: '12px',
            border: '2px solid #333'
        }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Upload Spawn Peek Video</h2>

            {error && (
                <div style={{
                    padding: '15px',
                    background: '#d32f2f',
                    color: '#fff',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    {error}
                </div>
            )}

            {success && (
                <div style={{
                    padding: '15px',
                    background: '#388e3c',
                    color: '#fff',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>
                        Video Title *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Main Entrance Spawn Peek"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '16px'
                        }}
                        disabled={uploading}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>
                        Map *
                    </label>
                    <select
                        value={formData.mapName}
                        onChange={(e) => setFormData({ ...formData, mapName: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '16px'
                        }}
                        disabled={uploading}
                    >
                        <option value="">Select a map...</option>
                        {maps.map(map => (
                            <option key={map} value={map}>{map}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>
                        Video File * (Max 100MB)
                    </label>
                    <input
                        id="video-file-input"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '16px'
                        }}
                        disabled={uploading}
                    />
                    {formData.videoFile && (
                        <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>
                            Selected: {formData.videoFile.name} ({(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                    )}
                </div>

                {uploading && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            width: '100%',
                            height: '30px',
                            background: '#2a2a2a',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            border: '1px solid #444'
                        }}>
                            <div style={{
                                width: `${uploadProgress}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                                transition: 'width 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>
                                {uploadProgress}%
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={uploading}
                    style={{
                        width: '100%',
                        padding: '15px',
                        background: uploading ? '#555' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>

            <p style={{ color: '#888', fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>
                Your video will be reviewed by our team before appearing on the site.
            </p>
        </div>
    );
}
