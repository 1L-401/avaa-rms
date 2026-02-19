'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        let cancelled = false;

        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                if (!cancelled) {
                    setIsLoading(false);
                    router.replace('/user/signin');
                }
                return;
            }

            try {
                const response = await api.post('/auth/me');
                if (!cancelled) {
                    setUser(response.data);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                if (!cancelled) {
                    localStorage.removeItem('token');
                    setIsLoading(false);
                    router.replace('/user/signin');
                }
            }
        };

        checkAuth();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // Ignore errors during logout
        } finally {
            localStorage.removeItem('token');
            router.replace('/user/signin');
        }
    };

    return { isAuthenticated, isLoading, user, logout };
}
