'use client';

import { LogOut, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isLoading: boolean;
}

export default function LogoutModal({ isOpen, onClose, onConfirm, isLoading }: LogoutModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* AVAA Logo */}
                <div className="flex justify-center mb-5">
                    <Image
                        src="/avaa_logo.png"
                        alt="AVAA Logo"
                        width={48}
                        height={48}
                        className="rounded-xl"
                    />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">Log Out</h2>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    Are you sure you want to log out? You will need to sign in again to manage your dashboard and settings.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7EB0AB] text-sm font-bold text-white hover:bg-[#6a9e99] transition-colors duration-200 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Logging out…
                            </>
                        ) : (
                            <>
                                <LogOut size={16} />
                                Log Out
                            </>
                        )}
                    </button>
                </div>

                {/* Footer */}
                <p className="text-[11px] text-gray-400 mt-5">Securely powered by AVAA Systems</p>
            </div>
        </div>
    );
}
