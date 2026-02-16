'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.post('/auth/me'); // Changed to match JWT Auth standard 'me' endpoint
                setUser(response.data);
            } catch (error) {
                router.push('/signin');
            }
        };

        fetchUser();
    }, [router]);

    if (!user) {
        return <div className="p-24">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <div className="bg-white text-black p-6 rounded shadow-md">
                <p>Welcome, <strong>{user.name}</strong>!</p>
                <p>Email: {user.email}</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        router.push('/signin');
                    }}
                    className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
