'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import api from '@/lib/axios';

export default function SettingsPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState('');
    const [saveError, setSaveError] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const router = useRouter();
    const { isLoading, user, logout } = useAuth();

    useEffect(() => { document.title = 'Settings | AVAA'; }, []);

    // Populate fields from user data
    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setName(user.name || '');
        }
    }, [user]);

    if (isLoading) return null;

    const handleChangePassword = async () => {
        setSaveError('');
        setSaveSuccess('');

        if (!currentPassword || !newPassword) {
            setSaveError('Please fill in both current and new password.');
            return;
        }
        if (newPassword.length < 6) {
            setSaveError('New password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setSaveError('New passwords do not match.');
            return;
        }

        setSaving(true);
        try {
            await api.put('/auth/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
            });
            setSaveSuccess('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setTimeout(() => setSaveSuccess(''), 4000);
        } catch (err: any) {
            setSaveError(err.response?.data?.error || 'Failed to change password.');
        } finally {
            setSaving(false);
        }
    };

    // Eye icon component to reduce repetition
    const EyeIcon = ({ open }: { open: boolean }) => open ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#f5f7fa] page-enter">
            {/* ─── Navbar ─── */}
            <nav className="sticky top-0 z-30 bg-white border-b border-[#e5e7eb] px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto">
                    <Link href="/user/dashboard" className="flex items-center gap-2.5">
                        <Image src="/avaa_logo.png" alt="AVAA Logo" width={32} height={32} />
                        <span className="text-lg font-bold text-[#1e3a4f] tracking-wide hidden sm:block">AVAA</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href="/user/dashboard" className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4z" />
                                </svg>
                            <span className="hidden sm:inline">Jobs</span>
                        </Link>
                        <Link href="/user/profile" className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="hidden sm:inline">Profile</span>
                        </Link>
                        <button className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: '#3CD894' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                            <span className="hidden sm:inline">Settings</span>
                        </button>
                        <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── Content ─── */}
            <div className="max-w-[780px] mx-auto px-6 py-8">
                <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-6">Settings</h1>

                {/* Success / Error banners */}
                {saveSuccess && (
                    <div className="mb-5 p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        {saveSuccess}
                    </div>
                )}
                {saveError && (
                    <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                        {saveError}
                    </div>
                )}

                {/* ─── Section 1: Account Info (read-only) ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-[#e6faf0] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3CD894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1a1a1a]">Account Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                readOnly
                                className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#5a6a75] cursor-not-allowed"
                            />
                            <p className="text-[11px] text-[#9ca3af] mt-1">Edit from your Profile page</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#5a6a75] cursor-not-allowed"
                            />
                            <p className="text-[11px] text-[#9ca3af] mt-1">Email cannot be changed</p>
                        </div>
                    </div>
                </div>

                {/* ─── Section 2: Change Password ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-[#fef3e2] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1a1a1a]">Change Password</h3>
                    </div>

                    <div className="space-y-5">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Current Password</label>
                            <div className="relative">
                                <input
                                    id="current-password"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9ca3af] hover:text-[#5a6a75] transition-colors"
                                >
                                    <EyeIcon open={showCurrentPassword} />
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-semibold text-[#1a1a1a] mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    id="new-password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="Enter new password (min 6 characters)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9ca3af] hover:text-[#5a6a75] transition-colors"
                                >
                                    <EyeIcon open={showNewPassword} />
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="Re-enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9ca3af] hover:text-[#5a6a75] transition-colors"
                                >
                                    <EyeIcon open={showConfirmPassword} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Section 3: Two-Factor (coming soon) ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 opacity-60">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-[#eef2ff] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1a1a1a]">Two-Factor Authentication</h3>
                            <span className="text-[11px] font-medium text-[#6366f1] bg-[#eef2ff] px-2 py-0.5 rounded-full">Coming Soon</span>
                        </div>
                    </div>
                    <p className="text-sm text-[#5a6a75]">Add an extra layer of security to your account with two-factor authentication. This feature will be available soon.</p>
                </div>

                {/* ─── Save Changes Button ─── */}
                <div className="flex justify-end">
                    <button
                        onClick={handleChangePassword}
                        disabled={saving || (!currentPassword && !newPassword)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#3CD894] hover:bg-[#2bb87a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:ring-offset-2"
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                        )}
                        {saving ? 'Saving...' : 'Change Password'}
                    </button>
                </div>
            </div>

            {/* ─── Sign Out Confirmation Modal ─── */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-[fadeIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">Sign Out</h3>
                            <p className="text-sm text-[#5a6a75] mb-6">Are you sure you want to sign out of your account?</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#d1d5db] text-sm font-semibold text-[#5a6a75] hover:bg-[#f5f7fa] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={logout}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
