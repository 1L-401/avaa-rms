'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const JOBS = [
    {
        id: 1,
        initials: 'TN',
        color: '#1e3a4f',
        title: 'Senior Frontend Developer',
        company: 'TechNova',
        location: 'San Francisco, CA',
        timeAgo: '2d ago',
        type: 'Full-time',
        tags: ['React', 'TypeScript', 'Tailwind CSS'],
        salary: '$120k-$160k',
    },
    {
        id: 2,
        initials: 'DS',
        color: '#3a8a8c',
        title: 'Backend Engineer',
        company: 'DataStream',
        location: 'New York, NY',
        timeAgo: '3d ago',
        type: 'Full-time',
        tags: ['Node.js', 'PostgreSQL', 'AWS'],
        salary: '$130k -$170k',
    },
    {
        id: 3,
        initials: 'CH',
        color: '#1e3a4f',
        title: 'UX/UI Designer',
        company: 'CreativeHub',
        location: 'Remote',
        timeAgo: '4d ago',
        type: 'Contract',
        tags: ['Figma', 'User Research', 'Prototyping'],
        salary: '$90k-$120k',
    },
    {
        id: 4,
        initials: 'CS',
        color: '#2a5a6e',
        title: 'DevOps Engineer',
        company: 'CloudScale',
        location: 'Austin, TX',
        timeAgo: '5d ago',
        type: 'Full-time',
        tags: ['Kubernetes', 'Docker', 'Terraform'],
        salary: '$140k -$180k',
    },
];

const SKILLS = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Figma'];
const COMPANIES = ['TechNova', 'DataStream', 'CreativeHub', 'CloudScale'];
const DATE_FILTERS = ['All Time', 'Today', 'This Week', 'This Month'];

export default function UserDashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDateFilter, setActiveDateFilter] = useState('All Time');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [bookmarked, setBookmarked] = useState<number[]>([]);
    const router = useRouter();

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const toggleCompany = (company: string) => {
        setSelectedCompanies((prev) =>
            prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
        );
    };

    const toggleBookmark = (id: number) => {
        setBookmarked((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* ─── Navbar ─── */}
            <nav className="sticky top-0 z-30 bg-white border-b border-[#e5e7eb] px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto">
                    {/* Logo */}
                    <Link href="/user/dashboard" className="flex items-center gap-2.5">
                        <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M60 10L90 60H30L60 10Z" fill="#1e3a4f" />
                            <path d="M40 40L60 10L80 40H40Z" fill="#2a5a6e" opacity="0.9" />
                            <path d="M30 60L50 30L70 60H30Z" fill="#3a8a8c" opacity="0.8" />
                            <path d="M50 60L70 30L90 60H50Z" fill="#3a8a8c" opacity="0.8" />
                            <path d="M25 70L45 40H65L45 70H25Z" fill="#4aa8a0" opacity="0.7" />
                            <path d="M55 70L75 40H95L75 70H55Z" fill="#4aa8a0" opacity="0.7" />
                            <path d="M35 80L55 55H75L55 80H35Z" fill="#6cc4b0" opacity="0.6" />
                        </svg>
                        <span className="text-lg font-bold text-[#1e3a4f] tracking-wide">AVAA</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: 'linear-gradient(to right, #1e3a4f, #3a8a8c)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4z" />
                            </svg>
                            Jobs
                        </button>
                        <Link href="/user/profile" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            Profile
                        </Link>
                        <Link href="#" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                            Settings
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                router.push('/user/signin');
                            }}
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

            {/* ─── Main Content ─── */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-1">Find Your Next Role</h1>
                    <p className="text-[15px] text-[#5a6a75]">Browse open positions from top companies</p>
                </div>

                <div className="flex gap-8">
                    {/* ─── Left Sidebar ─── */}
                    <aside className="hidden lg:block w-[240px] flex-shrink-0">
                        {/* Search */}
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 border border-[#d1d5db] rounded-lg text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Date Posted */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Date Posted</h3>
                            <div className="flex flex-wrap gap-2">
                                {DATE_FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveDateFilter(filter)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeDateFilter === filter
                                            ? 'bg-[#1e3a4f] text-white'
                                            : 'bg-white border border-[#d1d5db] text-[#5a6a75] hover:bg-[#f0f2f5]'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {SKILLS.map((skill) => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedSkills.includes(skill)
                                            ? 'bg-[#3a8a8c] text-white'
                                            : 'bg-white border border-[#d1d5db] text-[#5a6a75] hover:bg-[#f0f2f5]'
                                            }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Company</h3>
                            <div className="space-y-2">
                                {COMPANIES.map((company) => (
                                    <label key={company} className="flex items-center gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCompanies.includes(company)}
                                            onChange={() => toggleCompany(company)}
                                            className="w-4 h-4 rounded border-[#d1d5db] text-[#3a8a8c] focus:ring-[#2a7a7a] accent-[#3a8a8c]"
                                        />
                                        <span className="text-sm text-[#5a6a75] group-hover:text-[#1a1a1a] transition-colors">{company}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* ─── Job Cards Grid ─── */}
                    <main className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {JOBS.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:shadow-lg hover:border-[#c5ccd3] transition-all duration-200 group cursor-pointer"
                                >
                                    {/* Top Row: Avatar + Bookmark */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                                                style={{ backgroundColor: job.color }}
                                            >
                                                {job.initials}
                                            </div>
                                            <div>
                                                <h3 className="text-[15px] font-bold text-[#1a1a1a] leading-tight">{job.title}</h3>
                                                <p className="text-[13px] text-[#5a6a75]">{job.company}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleBookmark(job.id); }}
                                            className="text-[#9ca3af] hover:text-[#1e3a4f] transition-colors p-1"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked.includes(job.id) ? '#1e3a4f' : 'none'} stroke={bookmarked.includes(job.id) ? '#1e3a4f' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Meta Row */}
                                    <div className="flex items-center gap-3 mb-4 text-[13px] text-[#5a6a75]">
                                        <span className="flex items-center gap-1">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                            {job.timeAgo}
                                        </span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${job.type === 'Full-time'
                                            ? 'bg-[#e6f7f2] text-[#2a7a7a]'
                                            : 'bg-[#fef3e2] text-[#b8860b]'
                                            }`}>
                                            {job.type}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-[#f0f2f5] text-[#5a6a75]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom Row */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[15px] font-bold text-[#1a1a1a]">{job.salary}</span>
                                        <span className="text-[13px] font-semibold text-[#3a8a8c] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            View Details
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
