'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [phone, setPhone] = useState('+1(555)123-4567');
    const [location, setLocation] = useState('San Francisco, CA');
    const [bio, setBio] = useState('Passionate full-stack developer with 5+ years of experience building scalable web applications.');
    const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']);
    const [newSkill, setNewSkill] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [resumeFile, setResumeFile] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const addSkill = () => {
        const trimmed = newSkill.trim();
        if (trimmed && !skills.includes(trimmed)) {
            setSkills([...skills, trimmed]);
            setNewSkill('');
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setResumeFile(file.name);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setResumeFile(file.name);
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* ─── Navbar ─── */}
            <nav className="sticky top-0 z-30 bg-white border-b border-[#e5e7eb] px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto">
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
                    <div className="flex items-center gap-2">
                        <Link href="/user/dashboard" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4z" />
                            </svg>
                            Jobs
                        </Link>
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: 'linear-gradient(to right, #1e3a4f, #3a8a8c)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            Profile
                        </button>
                        <Link href="#" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                            Settings
                        </Link>
                        <button
                            onClick={() => { localStorage.removeItem('token'); router.push('/user/signin'); }}
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

            {/* ─── Content ─── */}
            <div className="max-w-[780px] mx-auto px-6 py-8">
                <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-6">My Profile</h1>

                {/* ─── Avatar Card ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 flex items-center gap-5">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-[#d1d5db] flex items-center justify-center flex-shrink-0">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[#1a1a1a]">{fullName}</h2>
                        <p className="text-sm text-[#5a6a75] mb-1">{email}</p>
                        <button className="flex items-center gap-1.5 text-sm font-medium text-[#3a8a8c] hover:text-[#1e5a5a] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Upload Photo
                        </button>
                    </div>
                    {/* Edit icon */}
                    <button className="ml-auto text-[#9ca3af] hover:text-[#5a6a75] transition-colors p-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </button>
                </div>

                {/* ─── Personal Information ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-5">Personal Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="profile-name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <input
                                    id="profile-name"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="profile-email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13L2 4" />
                                    </svg>
                                </div>
                                <input
                                    id="profile-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="profile-phone" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                </div>
                                <input
                                    id="profile-phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="profile-location" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Location</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <input
                                    id="profile-location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="profile-bio" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Bio</label>
                        <textarea
                            id="profile-bio"
                            rows={3}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-4 py-3 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all resize-none"
                        />
                    </div>
                </div>

                {/* ─── Skills ─── */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Skills</h3>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[#e6f7f2] text-[#2a7a7a]"
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Add skill input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a skill..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 px-4 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#2a7a7a] focus:border-transparent transition-all"
                        />
                        <button
                            onClick={addSkill}
                            className="px-4 py-2.5 text-sm font-medium text-[#5a6a75] bg-[#f0f2f5] rounded-xl hover:bg-[#e5e7eb] transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* ─── Resume/CV ─── */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Resume/CV</h3>
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex flex-col items-center justify-center py-10 px-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${isDragging
                                ? 'border-[#3a8a8c] bg-[#e6f7f2]'
                                : 'border-[#d1d5db] bg-white hover:border-[#9ca3af]'
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                        {resumeFile ? (
                            <p className="text-sm font-medium text-[#1a1a1a]">{resumeFile}</p>
                        ) : (
                            <>
                                <p className="text-sm text-[#5a6a75] mb-1">Drag and drop your resume, or click to browse</p>
                                <span className="text-sm font-semibold text-[#3a8a8c]">Upload Resume</span>
                            </>
                        )}
                    </div>
                </div>

                {/* ─── Save Button ─── */}
                <div className="flex justify-end">
                    <button
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                        style={{ background: 'linear-gradient(to right, #1e3a4f, #3a8a8c, #6cc4b0)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                        </svg>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
