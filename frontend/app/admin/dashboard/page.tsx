'use client';

import { useEffect, useState } from 'react';
import {
    Users,
    UserCheck,
    UserX,
    UserPlus,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import api from '@/lib/axios';

interface DashboardData {
    stats: {
        total_users: number;
        verified_users: number;
        unverified_users: number;
    };
    user_growth: { month: string; users: number }[];
    recent_users: {
        id: number;
        name: string;
        email: string;
        created_at: string;
        email_verified_at: string | null;
    }[];
}

export default function AdminDashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Admin Dashboard | AVAA';

        const token = localStorage.getItem('admin_token');
        api.get('/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setData(res.data))
            .catch((err) => console.error('Failed to load dashboard:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3CD894]" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="p-8">
                <p className="text-red-500">Failed to load dashboard data.</p>
            </div>
        );
    }

    const stats = [
        { title: 'Total Users', value: data.stats.total_users.toLocaleString(), icon: Users, color: 'bg-blue-500' },
        { title: 'Verified Users', value: data.stats.verified_users.toLocaleString(), icon: UserCheck, color: 'bg-[#3CD894]' },
        { title: 'Unverified Users', value: data.stats.unverified_users.toLocaleString(), icon: UserX, color: 'bg-orange-500' },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-xl`}>
                                <Icon size={24} className="text-white" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* User Growth Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">User Registrations (Last 6 Months)</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.user_growth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                }}
                            />
                            <Bar dataKey="users" fill="#3CD894" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h2>
                <div className="space-y-4">
                    {data.recent_users.length === 0 ? (
                        <p className="text-gray-400 text-sm">No users yet.</p>
                    ) : (
                        data.recent_users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#3CD894]/10 rounded-full flex items-center justify-center">
                                        <UserPlus size={18} className="text-[#3CD894]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                                        user.email_verified_at
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {user.email_verified_at ? 'Verified' : 'Unverified'}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
