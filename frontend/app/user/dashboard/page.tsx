'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        position: 'Senior Frontend Developer',
        description: `The Mission: Join TechNova to lead the frontend architecture of our next-gen data platform. We're looking for a Senior React Developer who obsesses over clean code, performance, and building beautiful user experiences with TypeScript and Tailwind CSS.`,
        whatYoullDo: [
            'Build & Scale: Architect reusable React components for high-traffic dashboards.',
            'Lead: Set the standard for frontend best practices and mentor the engineering team.',
            'Innovate: Work directly with Design to bridge the gap between Figma and production.',
        ],
        whyCompany: [
            'High Growth: Join a fast-paced team with zero legacy code.',
            'Flexibility: 100% remote-first culture with flexible hours.',
            'Top Tier Pay: $120k–$160k + Equity and full benefits.',
        ],
    },
    {
        id: 2,
        initials: 'DS',
        color: '#3CD894',
        title: 'Backend Engineer',
        company: 'DataStream',
        location: 'New York, NY',
        timeAgo: '3d ago',
        type: 'Full-time',
        tags: ['Node.js', 'PostgreSQL', 'AWS'],
        salary: '$130k-$170k',
        position: 'Backend Engineer',
        description: `DataStream is looking for a Backend Engineer to build robust, scalable APIs that power real-time data pipelines. You'll work with Node.js, PostgreSQL, and AWS to deliver reliable infrastructure for millions of users.`,
        whatYoullDo: [
            'Design and implement RESTful and GraphQL APIs for data ingestion.',
            'Optimize database queries and ensure high-availability services.',
            'Collaborate with DevOps to deploy and monitor production systems on AWS.',
        ],
        whyCompany: [
            'Impact: Your code will process millions of events per second.',
            'Growth: Dedicated learning budget and conference attendance.',
            'Compensation: $130k–$170k + equity and comprehensive benefits.',
        ],
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
        position: 'UX/UI Designer',
        description: `CreativeHub is seeking a talented UX/UI Designer to craft intuitive and visually stunning interfaces. You'll lead user research, create wireframes, and deliver pixel-perfect designs in Figma.`,
        whatYoullDo: [
            'Conduct user research and usability testing to inform design decisions.',
            'Create wireframes, prototypes, and high-fidelity mockups in Figma.',
            'Collaborate closely with engineers to ensure design fidelity in production.',
        ],
        whyCompany: [
            'Creative Freedom: Shape the product from concept to launch.',
            'Remote-First: Work from anywhere with a flexible schedule.',
            'Compensation: $90k–$120k with performance bonuses.',
        ],
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
        salary: '$140k-$180k',
        position: 'DevOps Engineer',
        description: `CloudScale needs a DevOps Engineer to build and maintain our cloud infrastructure. You'll work with Kubernetes, Docker, and Terraform to automate deployments and ensure 99.99% uptime.`,
        whatYoullDo: [
            'Design and manage CI/CD pipelines for automated deployments.',
            'Monitor, troubleshoot, and optimize cloud infrastructure on AWS/GCP.',
            'Implement infrastructure-as-code using Terraform and Helm charts.',
        ],
        whyCompany: [
            'Scale: Manage infrastructure serving 50M+ monthly users.',
            'Culture: Blameless post-mortems and a strong engineering culture.',
            'Compensation: $140k–$180k + stock options and full benefits.',
        ],
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
    const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
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
                        <Image src="/avaa_logo.png" alt="AVAA Logo" width={32} height={32} />
                        <span className="text-lg font-bold text-[#1e3a4f] tracking-wide">AVAA</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: '#3CD894' }}>
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
                        <Link href="/user/settings" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
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
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-1">Find Your Next Role</h1>
                    <p className="text-[15px] text-[#5a6a75]">Browse open positions from top companies</p>
                </div>

                <div className="flex gap-8">
                    {/* ─── Left Sidebar ─── */}
                    <aside className={`hidden lg:block flex-shrink-0 ${selectedJob ? 'w-[200px]' : 'w-[240px]'} transition-all duration-200`}>
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
                                className="w-full pl-10 pr-3 py-2.5 border border-[#d1d5db] rounded-lg text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
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
                                            ? 'bg-[#3CD894] text-white'
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
                                            className="w-4 h-4 rounded border-[#d1d5db] text-[#3CD894] focus:ring-[#3CD894] accent-[#3CD894]"
                                        />
                                        <span className="text-sm text-[#5a6a75] group-hover:text-[#1a1a1a] transition-colors">{company}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* ─── Job Cards Grid ─── */}
                    <main className={`min-w-0 ${selectedJob ? 'w-[340px] flex-shrink-0' : 'flex-1'} transition-all duration-200`}>
                        <div className={`grid gap-5 ${selectedJob ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                            {JOBS.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`bg-white rounded-2xl border p-5 hover:shadow-lg transition-all duration-200 group cursor-pointer ${selectedJob?.id === job.id
                                        ? 'border-[#3CD894] shadow-md'
                                        : 'border-[#e5e7eb] hover:border-[#c5ccd3]'
                                        }`}
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
                                            ? 'bg-[#e6f7f2] text-[#3CD894]'
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
                                        <span className="text-[13px] font-semibold text-[#3CD894] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            View Details
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* ─── Job Detail Panel ─── */}
                    {selectedJob && (
                        <aside className="hidden lg:flex flex-1 min-w-0 sticky top-24 self-start">
                            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 max-h-[calc(100vh-120px)] overflow-y-auto w-full">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-base"
                                            style={{ backgroundColor: selectedJob.color }}
                                        >
                                            {selectedJob.initials}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#1a1a1a]">{selectedJob.company}</h2>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                                            style={{ background: '#3CD894' }}
                                        >
                                            APPLY NOW
                                        </button>
                                        <button
                                            onClick={() => toggleBookmark(selectedJob.id)}
                                            className="text-[#9ca3af] hover:text-[#1e3a4f] transition-colors p-2"
                                        >
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill={bookmarked.includes(selectedJob.id) ? '#1e3a4f' : 'none'} stroke={bookmarked.includes(selectedJob.id) ? '#1e3a4f' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedJob(null)}
                                            className="text-[#9ca3af] hover:text-[#1a1a1a] transition-colors p-2"
                                        >
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-4 mb-5 text-[14px] text-[#5a6a75]">
                                    <span className="flex items-center gap-1.5">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        {selectedJob.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        {selectedJob.timeAgo}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${selectedJob.type === 'Full-time'
                                        ? 'bg-[#e6f7f2] text-[#3CD894]'
                                        : 'bg-[#fef3e2] text-[#b8860b]'
                                        }`}>
                                        {selectedJob.type}
                                    </span>
                                </div>

                                {/* Salary */}
                                <p className="text-lg font-bold text-[#1a1a1a] mb-6">{selectedJob.salary}</p>

                                <hr className="border-[#e5e7eb] mb-6" />

                                {/* Position */}
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-2">Position</h3>
                                    <p className="text-[14px] text-[#5a6a75]">*{selectedJob.position}</p>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">Tech Stack Requirements</h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {selectedJob.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-[#e6faf0] text-[#3CD894]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">Description</h3>
                                    <p className="text-[14px] text-[#5a6a75] leading-[1.7]">{selectedJob.description}</p>
                                </div>

                                {/* What You'll Do */}
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">What You&apos;ll Do</h3>
                                    <ul className="space-y-2.5">
                                        {selectedJob.whatYoullDo.map((item, i) => (
                                            <li key={i} className="text-[14px] text-[#5a6a75] leading-[1.7] flex gap-2.5">
                                                <span className="text-[#3CD894] font-bold mt-0.5">•</span>
                                                <span><strong className="text-[#1a1a1a]">{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Why Company */}
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">Why {selectedJob.company}?</h3>
                                    <ul className="space-y-2.5">
                                        {selectedJob.whyCompany.map((item, i) => (
                                            <li key={i} className="text-[14px] text-[#5a6a75] leading-[1.7] flex gap-2.5">
                                                <span className="text-[#3CD894] font-bold mt-0.5">•</span>
                                                <span><strong className="text-[#1a1a1a]">{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
