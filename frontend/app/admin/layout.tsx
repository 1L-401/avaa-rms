'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    LogOut,
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-[#f5f7fa]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-60 bg-[#0f172a] text-white flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#3CD894] rounded-lg flex items-center justify-center text-[#0f172a] font-bold">
                            A
                        </span>
                        Admin Panel
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#3CD894] text-[#0f172a] font-semibold'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </a>
                        );
                    })}
                </nav>

                {/* Sign Out Button */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-60">
                {children}
            </main>
        </div>
    );
}
