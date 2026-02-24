'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/axios';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => { document.title = 'Admin Login | AVAA'; }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/admin/login', { email, password });
            localStorage.setItem('admin_token', res.data.access_token);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)' }}>

            {/* ─── Decorative gradient shapes ─── */}
            {/* ─── Centered Radial Gradient ─── */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-20 blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #3CD894 0%, transparent 70%)' }}
            />

            {/* ─── Login Content ─── */}
            <div className="relative z-10 w-full max-w-[400px] mx-4">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-2xl">
                        <Image src="/avaa_logo.png" alt="AVAA Logo" width={50} height={50} priority />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-wide mb-2">Admin Portal</h1>
                    <p className="text-[15px] text-white/50">Sign in to access the admin dashboard</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="admin-email" className="block text-[14px] font-medium text-white/60 mb-2">
                            Email
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#3CD894]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-focus-within:text-[#3CD894]">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 4L12 13L2 4" />
                                </svg>
                            </div>
                            <input
                                id="admin-email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-[15px] text-white placeholder-white/20 border border-white/5 focus:outline-none focus:ring-2 focus:ring-[#3CD894]/50 focus:border-transparent transition-all"
                                style={{ background: '#1e293b' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="admin-password" className="block text-[14px] font-medium text-white/60 mb-2">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-focus-within:text-[#3CD894]">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            </div>
                            <input
                                id="admin-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl text-[15px] text-white placeholder-white/20 border border-white/5 focus:outline-none focus:ring-2 focus:ring-[#3CD894]/50 focus:border-transparent transition-all"
                                style={{ background: '#1e293b' }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl text-[#0f172a] font-bold text-[16px] transition-all duration-200 hover:shadow-lg hover:shadow-[#3CD894]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        style={{
                            background: '#3CD894',
                            boxShadow: '0 0 20px rgba(60, 216, 148, 0.15)'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Back to user login */}
                <p className="text-center mt-10">
                    <Link
                        href="/user/signin"
                        className="text-[14px] font-medium text-[#3CD894]/80 hover:text-[#3CD894] transition-colors"
                    >
                        Back to user login
                    </Link>
                </p>
            </div>
        </div>
    );
}
