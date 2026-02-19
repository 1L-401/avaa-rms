'use client';

import { useEffect } from 'react';
import {
    Users,
    Briefcase,
    FileText,
    Activity,
    UserPlus,
    FilePlus,
    FileCheck,
    UserCog,
    FileX,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';

// Mock data for stats
const stats = [
    { title: 'Total Users', value: '1,248', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Jobs', value: '456', icon: Briefcase, color: 'bg-purple-500' },
    { title: 'Applications', value: '3,892', icon: FileText, color: 'bg-orange-500' },
    { title: 'Active Jobs', value: '312', icon: Activity, color: 'bg-[#3CD894]' },
];

// Mock data for Application Trends (Bar Chart)
const applicationData = [
    { month: 'Sep', applications: 420 },
    { month: 'Oct', applications: 580 },
    { month: 'Nov', applications: 650 },
    { month: 'Dec', applications: 720 },
    { month: 'Jan', applications: 890 },
    { month: 'Feb', applications: 1050 },
];

// Mock data for User Growth (Line Chart)
const userGrowthData = [
    { month: 'Sep', users: 650 },
    { month: 'Oct', users: 780 },
    { month: 'Nov', users: 890 },
    { month: 'Dec', users: 980 },
    { month: 'Jan', users: 1120 },
    { month: 'Feb', users: 1248 },
];

// Mock data for Recent Activity
const recentActivity = [
    { id: 1, title: 'New user registered', subtitle: 'john.doe@email.com', time: '2 minutes ago', icon: UserPlus },
    { id: 2, title: 'Job posted', subtitle: 'Admin User', time: '15 minutes ago', icon: FilePlus },
    { id: 3, title: 'Application submitted', subtitle: 'jane.smith@email.com', time: '1 hour ago', icon: FileCheck },
    { id: 4, title: 'Profile updated', subtitle: 'mike.wilson@email.com', time: '3 hours ago', icon: UserCog },
    { id: 5, title: 'Job closed', subtitle: 'Admin User', time: '5 hours ago', icon: FileX },
];

export default function AdminDashboardPage() {
    useEffect(() => {
        document.title = 'Admin Dashboard | AVAA';
    }, []);

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your job portal</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Application Trends (Bar Chart) */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Trends</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={applicationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Bar dataKey="applications" fill="#3CD894" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Growth (Line Chart) */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#3CD894"
                                    strokeWidth={3}
                                    dot={{ fill: '#3CD894', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#3CD894' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {recentActivity.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#3CD894]/10 rounded-full flex items-center justify-center">
                                        <Icon size={18} className="text-[#3CD894]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{activity.title}</p>
                                        <p className="text-sm text-gray-500">{activity.subtitle}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">{activity.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
