'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsNavigating(false);
    }, [pathname]);

    const navigate = useCallback((url) => {
        setIsNavigating(true);
        router.push(url);
    }, [router]);

    return (
        <NavigationContext.Provider value={{ navigate, isNavigating }}>
            {children}
            {isNavigating && (
                <div style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(10, 10, 10, 0.75)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        width: '48px', height: '48px',
                        border: '4px solid #333',
                        borderTop: '4px solid #61dafb',
                        borderRadius: '50%',
                        animation: 'nav-spin 0.75s linear infinite',
                    }} />
                </div>
            )}
        </NavigationContext.Provider>
    );
}

export function useNavigate() {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error('useNavigate must be used inside NavigationProvider');
    return ctx;
}
