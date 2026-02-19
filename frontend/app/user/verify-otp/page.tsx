'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/axios';

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    useEffect(() => { document.title = 'Verify Email | AVAA'; }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData) {
            const newOtp = [...otp];
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            const focusIndex = Math.min(pastedData.length, 5);
            inputRefs.current[focusIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const otpCode = otp.join('');
            const response = await api.post('/auth/verify-otp', { email, otp: otpCode });
            setSuccess(response.data.message || 'Email verified successfully!');
            setTimeout(() => {
                router.push('/user/signin');
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setSuccess('');
        setResending(true);

        try {
            const response = await api.post('/auth/resend-otp', { email });
            setSuccess(response.data.message || 'A new code has been sent!');
            setOtp(Array(6).fill(''));
            inputRefs.current[0]?.focus();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to resend code. Please try again.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#dfe6ec] px-4">
            <div className="w-full max-w-[420px] text-center">
                {/* AVAA Logo */}
                <div className="flex justify-center mb-6">
                    <Image src="/avaa_logo.png" alt="AVAA Logo" width={80} height={80} priority />
                </div>

                {/* Heading */}
                <h1 className="text-[24px] font-bold text-[#1e3a4f] mb-2">Verify your email</h1>
                <p className="text-[14px] text-[#5a6a75] mb-2 leading-relaxed">
                    We&apos;ve sent a 6-digit code to
                </p>
                {email && (
                    <p className="text-[14px] font-semibold text-[#1e3a4f] mb-8">{email}</p>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-left">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mb-5 p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm text-left">
                        {success}
                    </div>
                )}

                {/* OTP Form */}
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-xl font-bold text-[#1a1a1a] border-2 border-[#d1d5db] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                aria-label={`Digit ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.some((d) => !d)}
                        className="w-full py-3.5 rounded-xl text-white font-semibold text-[15px] transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: '#3CD894',
                        }}
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                {/* Resend Link */}
                <p className="text-[14px] text-[#5a6a75] mt-6">
                    Didn&apos;t receive the code?{' '}
                    <button
                        type="button"
                        disabled={resending}
                        className="font-semibold text-[#3CD894] hover:text-[#2bb574] transition-colors disabled:opacity-50"
                        onClick={handleResend}
                    >
                        {resending ? 'Sending...' : 'Resend'}
                    </button>
                </p>
            </div>
        </div>
    );
}
