'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function SettingsPage() {
    const [email, setEmail] = useState('john@example.com');
    const [username, setUsername] = useState('johndoe');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const router = useRouter();
    const { isLoading, logout } = useAuth();

    useEffect(() => { document.title = 'Settings | AVAA'; }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#3CD894] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#5a6a75] text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    const handleSaveChanges = () => {
        // TODO: Implement save logic
        console.log('Saving changes...', { email, username, currentPassword, newPassword, twoFactorEnabled });
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* ─── Navbar ─── */}
            <nav className="sticky top-0 z-30 bg-white border-b border-[#e5e7eb] px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto">
                    <Link href="/user/dashboard" className="flex items-center gap-2.5">
                        <Image src="/avaa_logo.png" alt="AVAA Logo" width={32} height={32} />
                        <span className="text-lg font-bold text-[#1e3a4f] tracking-wide">AVAA</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href="/user/dashboard" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4z" />
                            </svg>
                            Jobs
                        </Link>
                        <Link href="/user/profile" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            Profile
                        </Link>
                        <Link href="/user/settings" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: 'linear-gradient(to right, #1e3a4f, #3a8a8c)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                            Settings
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── Content ─── */}
            <div className="max-w-[780px] mx-auto px-6 py-8">
                <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-6">Settings</h1>

                {/* ─── Section 1: Account Settings Card ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
                    <div className="flex items-center gap-3 mb-5">
                        {/* Shield Icon */}
                        <div className="w-10 h-10 rounded-full bg-[#e8f4f4] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3a8a8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1a1a1a]">Account Settings</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Email Address */}
                        <div>
                            <label htmlFor="settings-email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email Address</label>
                            <input
                                id="settings-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="settings-username" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Username</label>
                            <input
                                id="settings-username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Section 2: Security Card ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
                    <div className="flex items-center gap-3 mb-5">
                        {/* Lock Icon */}
                        <div className="w-10 h-10 rounded-full bg-[#fef3e2] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#1a1a1a]">Security</h3>
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
                                    className="w-full px-4 py-3 pr-12 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9ca3af] hover:text-[#5a6a75] transition-colors"
                                >
                                    {showCurrentPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
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
                                    className="w-full px-4 py-3 pr-12 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9ca3af] hover:text-[#5a6a75] transition-colors"
                                >
                                    {showNewPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <h4 className="text-sm font-semibold text-[#1a1a1a]">Two-Factor Authentication</h4>
                                <p className="text-xs text-[#5a6a75] mt-0.5">Add an extra layer of security to your account</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:ring-offset-2 ${twoFactorEnabled ? 'bg-[#22c55e]' : 'bg-[#d1d5db]'
                                    }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─── Save Changes Button ─── */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveChanges}
                        className="flex items-center gap-2 px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                        </svg>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
