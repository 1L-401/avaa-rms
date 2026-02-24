'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, MoreHorizontal, X, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import api from '@/lib/axios';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export default function UsersPage() {
    const [users, setUsers] = useState<PaginatedUsers | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [actionMenuId, setActionMenuId] = useState<number | null>(null);

    // Edit modal state
    const [editUser, setEditUser] = useState<User | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editVerified, setEditVerified] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState('');

    // Delete confirmation state
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const params: Record<string, string> = { page: String(page), per_page: '10' };
            if (search) params.search = search;
            if (statusFilter) params.status = statusFilter;

            const res = await api.get('/admin/users', {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    }, [page, search, statusFilter, token]);

    useEffect(() => {
        document.title = 'User Management | Admin Panel';
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Debounced search
    useEffect(() => {
        setPage(1);
    }, [search, statusFilter]);

    // Close action menu on outside click
    useEffect(() => {
        const handler = () => setActionMenuId(null);
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    const openEditModal = (user: User) => {
        setEditUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditVerified(!!user.email_verified_at);
        setEditError('');
        setActionMenuId(null);
    };

    const handleEdit = async () => {
        if (!editUser) return;
        setEditLoading(true);
        setEditError('');
        try {
            await api.put(`/admin/users/${editUser.id}`, {
                name: editName,
                email: editEmail,
                email_verified: editVerified,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditUser(null);
            fetchUsers();
        } catch (err: any) {
            setEditError(err.response?.data?.error || 'Failed to update user.');
        } finally {
            setEditLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteUser) return;
        setDeleteLoading(true);
        try {
            await api.delete(`/admin/users/${deleteUser.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDeleteUser(null);
            fetchUsers();
        } catch (err) {
            console.error('Failed to delete user:', err);
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">
                        {users ? `${users.total} registered users` : 'Loading...'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                    </select>

                    {/* Search Input */}
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">User</th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Status</th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Joined</th>
                                <th className="text-right text-sm font-medium text-gray-500 px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3CD894]" />
                                        </div>
                                    </td>
                                </tr>
                            ) : !users || users.data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                                                user.email_verified_at
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {user.email_verified_at ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActionMenuId(actionMenuId === user.id ? null : user.id);
                                                    }}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>
                                                {actionMenuId === user.id && (
                                                    <div
                                                        className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <button
                                                            onClick={() => openEditModal(user)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                        >
                                                            <Pencil size={14} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => { setDeleteUser(user); setActionMenuId(null); }}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users && users.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Page {users.current_page} of {users.last_page} ({users.total} users)
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={users.current_page <= 1}
                                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(users.last_page, p + 1))}
                                disabled={users.current_page >= users.last_page}
                                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── Edit Modal ─── */}
            {editUser && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
                            <button onClick={() => setEditUser(null)} className="p-1 rounded-lg hover:bg-gray-100">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        {editError && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                {editError}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editVerified}
                                        onChange={(e) => setEditVerified(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3CD894]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3CD894]" />
                                </label>
                                <span className="text-sm text-gray-700">Email Verified</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setEditUser(null)}
                                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEdit}
                                disabled={editLoading}
                                className="px-4 py-2.5 rounded-xl bg-[#3CD894] text-sm font-bold text-[#0f172a] hover:shadow-lg hover:shadow-[#3CD894]/20 disabled:opacity-50"
                            >
                                {editLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Delete Confirmation Modal ─── */}
            {deleteUser && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete <strong>{deleteUser.name}</strong> ({deleteUser.email})? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteUser(null)}
                                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className="px-4 py-2.5 rounded-xl bg-red-500 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50"
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
