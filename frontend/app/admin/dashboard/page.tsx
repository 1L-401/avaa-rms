'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-4">
                    <a href="#" className="block hover:text-gray-300">Dashboard</a>
                    <a href="#" className="block hover:text-gray-300">Users</a>
                    <a href="#" className="block hover:text-gray-300">Settings</a>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <button
                        onClick={() => router.push('/admin/login')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">Total Users</h3>
                        <p className="text-3xl font-bold">1,234</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">Active Jobs</h3>
                        <p className="text-3xl font-bold">56</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-gray-500 text-sm">Applications</h3>
                        <p className="text-3xl font-bold">892</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
