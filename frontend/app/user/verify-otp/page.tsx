'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
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
                <p className="text-[14px] text-[#5a6a75] mb-8 leading-relaxed">
                    We&apos;ve sent a 6-digit code to your email address. Enter it below to
                    <br />verify your account.
                </p>

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
                        className="font-semibold text-[#3CD894] hover:text-[#2bb574] transition-colors"
                        onClick={() => {/* resend logic later */ }}
                    >
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
