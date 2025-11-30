'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faUpload, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
    const { data: session, status } = useSession();
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    if (status === 'loading') {
        return (
            <span className="tab">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
            </span>
        );
    }

    if (!session) {
        return (
            <span className="tab" onClick={() => signIn('google')}>
                <FontAwesomeIcon icon={faUser} className="user-icon" style={{ cursor: 'pointer' }} />
            </span>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            <span
                className="tab"
                onClick={() => setShowMenu(!showMenu)}
                style={{ cursor: 'pointer' }}
            >
                {session.user.image ? (
                    <img
                        src={session.user.image}
                        alt="Profile"
                        onError={(e) => {
                            console.error('Failed to load profile image:', session.user.image);
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<i class="fa fa-user"></i>';
                        }}
                        onLoad={() => console.log('Profile image loaded successfully')}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid #fff'
                        }}
                    />
                ) : (
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                )}
            </span>

            {showMenu && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50px',
                        right: '0',
                        background: '#1a1a1a',
                        border: '2px solid #333',
                        borderRadius: '8px',
                        padding: '10px',
                        minWidth: '200px',
                        zIndex: 1000,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <div style={{ padding: '10px', borderBottom: '1px solid #333', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
                            {session.user.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888' }}>
                            {session.user.email}
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setShowMenu(false);
                            router.push('/upload');
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#333',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <FontAwesomeIcon icon={faUpload} />
                        Upload Video
                    </button>

                    <button
                        onClick={() => {
                            setShowMenu(false);
                            router.push('/admin');
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <FontAwesomeIcon icon={faUserShield} />
                        Admin Panel
                    </button>

                    <button
                        onClick={() => {
                            setShowMenu(false);
                            signOut();
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
