'use client';

import { useEffect } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const users = [
    {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        status: 'Active',
        joined: '2026-01-15',
        applications: 5,
    },
    {
        name: 'Bob Martinez',
        email: 'bob.martinez@example.com',
        status: 'Active',
        joined: '2026-01-18',
        applications: 3,
    },
    {
        name: 'Carol Williams',
        email: 'carol.w@example.com',
        status: 'Inactive',
        joined: '2026-01-22',
        applications: 0,
    },
    {
        name: 'David Chen',
        email: 'david.chen@example.com',
        status: 'Active',
        joined: '2026-02-01',
        applications: 8,
    },
    {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        status: 'Active',
        joined: '2026-02-10',
        applications: 2,
    },
    {
        name: 'Frank Wilson',
        email: 'frank.wilson@example.com',
        status: 'Inactive',
        joined: '2026-02-14',
        applications: 1,
    },
];

export default function UsersPage() {
    useEffect(() => {
        document.title = 'User Management | Admin Panel';
    }, []);

    return (
        <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">{users.length} registered users</p>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    User
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Status
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Joined
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Applications
                                </th>
                                <th className="text-right text-sm font-medium text-gray-500 px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    {/* User Column */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </td>

                                    {/* Status Column */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                                                user.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Joined Column */}
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700">{user.joined}</span>
                                    </td>

                                    {/* Applications Column */}
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700">{user.applications}</span>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
