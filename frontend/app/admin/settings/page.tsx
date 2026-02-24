'use client';

import { useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    useEffect(() => {
        document.title = 'Settings | Admin Panel';
    }, []);

    return (
        <div className="p-8">
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SettingsIcon size={28} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                    System configuration options will be available here in a future update. Stay tuned!
                </p>
            </div>
        </div>
    );
}
