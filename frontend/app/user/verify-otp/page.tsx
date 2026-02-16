'use client';

import { useState, useRef } from 'react';

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
                    <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 10L90 60H30L60 10Z" fill="#1e3a4f" />
                        <path d="M40 40L60 10L80 40H40Z" fill="#2a5a6e" opacity="0.9" />
                        <path d="M30 60L50 30L70 60H30Z" fill="#3a8a8c" opacity="0.8" />
                        <path d="M50 60L70 30L90 60H50Z" fill="#3a8a8c" opacity="0.8" />
                        <path d="M25 70L45 40H65L45 70H25Z" fill="#4aa8a0" opacity="0.7" />
                        <path d="M55 70L75 40H95L75 70H55Z" fill="#4aa8a0" opacity="0.7" />
                        <path d="M35 80L55 55H75L55 80H35Z" fill="#6cc4b0" opacity="0.6" />
                    </svg>
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
                                className="w-12 h-14 text-center text-xl font-bold text-[#1a1a1a] border-2 border-[#d1d5db] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                aria-label={`Digit ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.some((d) => !d)}
                        className="w-full py-3.5 rounded-xl text-white font-semibold text-[15px] transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: 'linear-gradient(to right, #1e3a4f, #3a8a8c, #6cc4b0)',
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
                        className="font-semibold text-[#2a7a7a] hover:text-[#1e5a5a] transition-colors"
                        onClick={() => {/* resend logic later */ }}
                    >
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
