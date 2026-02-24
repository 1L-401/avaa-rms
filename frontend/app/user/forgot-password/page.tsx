'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => { document.title = 'Forgot Password | AVAA'; }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setSuccess(response.data.message || 'Check your email for the reset link.');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4 page-enter">
            <div className="w-full max-w-[480px]">
                {/* Back to login */}
                <Link
                    href="/user/signin"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5a6a75] hover:text-[#1e3a4f] transition-colors mb-8"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                    Back to login
                </Link>

                {/* Heading */}
                <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-2">Forgot password?</h1>
                <p className="text-[15px] text-[#5a6a75] mb-8">
                    Enter your email and we&apos;ll send you reset instructions.
                </p>

                {/* Error Message */}
                {error && (
                    <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mb-5 p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="forgot-email" className="block text-[15px] font-semibold text-[#1a1a1a] mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 4L12 13L2 4" />
                                </svg>
                            </div>
                            <input
                                id="forgot-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 border border-[#d1d5db] rounded-xl text-[15px] text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl text-white font-semibold text-[15px] transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: '#3CD894',
                        }}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
