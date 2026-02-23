'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import AuthPromptModal from '@/components/AuthPromptModal';

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
    {
        id: 5,
        initials: 'AX',
        color: '#6366f1',
        title: 'Mobile Developer (React Native)',
        company: 'AppAxis',
        location: 'Los Angeles, CA',
        timeAgo: '1d ago',
        type: 'Full-time',
        tags: ['React Native', 'TypeScript', 'iOS', 'Android'],
        salary: '$110k-$150k',
        position: 'Mobile Developer',
        description: `AppAxis is hiring a Mobile Developer to build cross-platform apps with React Native. You'll own the full mobile stack from UI to deployment on both iOS and Android stores.`,
        whatYoullDo: [
            'Develop and maintain cross-platform mobile apps using React Native.',
            'Integrate RESTful APIs and third-party SDKs for push notifications and analytics.',
            'Publish and manage releases on the Apple App Store and Google Play.',
        ],
        whyCompany: [
            'Impact: 5M+ active users rely on our mobile apps daily.',
            'Tech Stack: Greenfield React Native with full TypeScript adoption.',
            'Compensation: $110k–$150k + equity and wellness stipend.',
        ],
    },
    {
        id: 6,
        initials: 'NL',
        color: '#0ea5e9',
        title: 'Data Scientist',
        company: 'NeuraLabs',
        location: 'Boston, MA',
        timeAgo: '1d ago',
        type: 'Full-time',
        tags: ['Python', 'Machine Learning', 'TensorFlow'],
        salary: '$135k-$175k',
        position: 'Data Scientist',
        description: `NeuraLabs is seeking a Data Scientist to build predictive models and drive data-informed product decisions. You'll work with large datasets and state-of-the-art ML frameworks.`,
        whatYoullDo: [
            'Build and deploy machine learning models for recommendation and forecasting.',
            'Analyze large datasets to identify trends and actionable insights.',
            'Collaborate with product and engineering teams to integrate ML into production.',
        ],
        whyCompany: [
            'Research-Driven: Publish papers and attend top ML conferences.',
            'Resources: Access to GPU clusters and cutting-edge tooling.',
            'Compensation: $135k–$175k + research bonus and benefits.',
        ],
    },
    {
        id: 7,
        initials: 'PH',
        color: '#1e3a4f',
        title: 'Product Manager',
        company: 'PivotHub',
        location: 'Remote',
        timeAgo: '6h ago',
        type: 'Full-time',
        tags: ['Product Strategy', 'Agile', 'Analytics'],
        salary: '$115k-$155k',
        position: 'Product Manager',
        description: `PivotHub is looking for a Product Manager to lead cross-functional teams and drive the product roadmap. You'll define strategy, prioritize features, and measure impact through data.`,
        whatYoullDo: [
            'Define product vision and roadmap based on user research and business goals.',
            'Work with engineering, design, and marketing to ship features on time.',
            'Analyze product metrics to inform decisions and iterate on the experience.',
        ],
        whyCompany: [
            'Ownership: Lead a product area end-to-end with full autonomy.',
            'Remote-First: Async culture with quarterly team retreats.',
            'Compensation: $115k–$155k + performance bonuses.',
        ],
    },
    {
        id: 8,
        initials: 'SG',
        color: '#ef4444',
        title: 'QA Engineer',
        company: 'ShieldGuard',
        location: 'Chicago, IL',
        timeAgo: '3d ago',
        type: 'Full-time',
        tags: ['Selenium', 'Cypress', 'API Testing'],
        salary: '$85k-$115k',
        position: 'QA Engineer',
        description: `ShieldGuard needs a QA Engineer to ensure the reliability and security of our fintech platform. You'll design test strategies and automate end-to-end testing with Cypress and Selenium.`,
        whatYoullDo: [
            'Design and execute test plans for web and API products.',
            'Build and maintain automated test suites using Cypress and Selenium.',
            'Collaborate with developers to identify and resolve defects pre-release.',
        ],
        whyCompany: [
            'Mission: Protect millions of financial transactions every day.',
            'Growth: Clear career path from QA Engineer to QA Lead.',
            'Compensation: $85k–$115k + annual bonus and stock options.',
        ],
    },
    {
        id: 9,
        initials: 'FL',
        color: '#3CD894',
        title: 'Full-Stack Developer',
        company: 'FlowLabs',
        location: 'Seattle, WA',
        timeAgo: '12h ago',
        type: 'Full-time',
        tags: ['Next.js', 'Node.js', 'MongoDB'],
        salary: '$125k-$165k',
        position: 'Full-Stack Developer',
        description: `FlowLabs is hiring a Full-Stack Developer to build end-to-end features across our SaaS platform. You'll work with Next.js on the frontend and Node.js + MongoDB on the backend.`,
        whatYoullDo: [
            'Build full-stack features from database to UI using Next.js and Node.js.',
            'Design and optimize MongoDB schemas for high-performance queries.',
            'Participate in code reviews and contribute to architectural decisions.',
        ],
        whyCompany: [
            'Modern Stack: Next.js 14, Node.js 20, MongoDB Atlas.',
            'Small Team: High ownership and direct impact on the product.',
            'Compensation: $125k–$165k + equity and unlimited PTO.',
        ],
    },
    {
        id: 10,
        initials: 'VP',
        color: '#8b5cf6',
        title: 'Technical Writer',
        company: 'VerbPro',
        location: 'Remote',
        timeAgo: '2d ago',
        type: 'Contract',
        tags: ['Documentation', 'API Docs', 'Markdown'],
        salary: '$70k-$95k',
        position: 'Technical Writer',
        description: `VerbPro is seeking a Technical Writer to create clear, developer-friendly documentation for our API platform. You'll write guides, tutorials, and API references.`,
        whatYoullDo: [
            'Write and maintain API reference documentation and developer guides.',
            'Create tutorials and onboarding content for new users.',
            'Work with engineering to keep docs accurate as features evolve.',
        ],
        whyCompany: [
            'Audience: Your docs will be read by 100k+ developers monthly.',
            'Flexibility: Fully remote with async-first workflow.',
            'Compensation: $70k–$95k with contract renewal options.',
        ],
    },
    {
        id: 11,
        initials: 'BF',
        color: '#f59e0b',
        title: 'Cybersecurity Analyst',
        company: 'ByteFortress',
        location: 'Washington, DC',
        timeAgo: '4d ago',
        type: 'Full-time',
        tags: ['Security', 'SIEM', 'Penetration Testing'],
        salary: '$100k-$140k',
        position: 'Cybersecurity Analyst',
        description: `ByteFortress is hiring a Cybersecurity Analyst to protect critical infrastructure for government and enterprise clients. You'll conduct threat analysis and penetration testing.`,
        whatYoullDo: [
            'Monitor and analyze security events using SIEM tools.',
            'Conduct penetration tests and vulnerability assessments.',
            'Develop incident response plans and security documentation.',
        ],
        whyCompany: [
            'Mission-Critical: Protect high-value government systems.',
            'Clearance: Company sponsors security clearance if needed.',
            'Compensation: $100k–$140k + clearance bonus and benefits.',
        ],
    },
    {
        id: 12,
        initials: 'GW',
        color: '#2a5a6e',
        title: 'Game Developer (Unity)',
        company: 'GridWorks',
        location: 'San Diego, CA',
        timeAgo: '1w ago',
        type: 'Full-time',
        tags: ['Unity', 'C#', '3D Graphics'],
        salary: '$95k-$130k',
        position: 'Game Developer',
        description: `GridWorks is looking for a Unity Game Developer to create immersive 3D experiences. You'll build gameplay systems, optimize rendering, and work closely with artists and designers.`,
        whatYoullDo: [
            'Develop gameplay mechanics and systems in Unity with C#.',
            'Optimize 3D rendering and performance for multiple platforms.',
            'Collaborate with artists and designers to bring creative visions to life.',
        ],
        whyCompany: [
            'Creative: Work on original IP with a passionate team.',
            'Tech: Latest Unity LTS with custom tooling and pipelines.',
            'Compensation: $95k–$130k + profit sharing on shipped titles.',
        ],
    },
    {
        id: 13,
        initials: 'EM',
        color: '#0d9488',
        title: 'Marketing Analyst',
        company: 'EchoMetrics',
        location: 'Miami, FL',
        timeAgo: '5d ago',
        type: 'Part-time',
        tags: ['SQL', 'Google Analytics', 'Tableau'],
        salary: '$55k-$75k',
        position: 'Marketing Analyst',
        description: `EchoMetrics needs a Marketing Analyst to turn campaign data into actionable insights. You'll build dashboards, run A/B tests, and optimize marketing spend across channels.`,
        whatYoullDo: [
            'Build and maintain marketing dashboards in Tableau and Google Analytics.',
            'Analyze campaign performance and recommend budget optimizations.',
            'Run A/B tests and report on conversion funnel metrics.',
        ],
        whyCompany: [
            'Data-Driven: Marketing decisions backed by real analytics.',
            'Flexibility: Part-time role with potential to go full-time.',
            'Compensation: $55k–$75k pro-rated + performance bonuses.',
        ],
    },
    {
        id: 14,
        initials: 'SF',
        color: '#1e3a4f',
        title: 'Solutions Architect',
        company: 'StackForge',
        location: 'Denver, CO',
        timeAgo: '3d ago',
        type: 'Full-time',
        tags: ['AWS', 'System Design', 'Microservices'],
        salary: '$150k-$200k',
        position: 'Solutions Architect',
        description: `StackForge is seeking a Solutions Architect to design scalable cloud architectures for enterprise clients. You'll lead technical discovery, create architecture diagrams, and guide engineering teams.`,
        whatYoullDo: [
            'Design and document cloud-native architectures on AWS.',
            'Lead technical discovery sessions with clients and stakeholders.',
            'Guide engineering teams on microservices patterns and best practices.',
        ],
        whyCompany: [
            'Seniority: Operate at the highest technical level in the org.',
            'Variety: Work across industries from fintech to healthcare.',
            'Compensation: $150k–$200k + consulting bonuses and equity.',
        ],
    },
    {
        id: 15,
        initials: 'PS',
        color: '#ec4899',
        title: 'Graphic Designer',
        company: 'PixelShift',
        location: 'Remote',
        timeAgo: '6d ago',
        type: 'Contract',
        tags: ['Photoshop', 'Illustrator', 'Branding'],
        salary: '$60k-$85k',
        position: 'Graphic Designer',
        description: `PixelShift is hiring a Graphic Designer to create stunning visual assets for tech startups. You'll work on branding, social media graphics, and marketing materials.`,
        whatYoullDo: [
            'Design brand identities including logos, color systems, and guidelines.',
            'Create social media graphics, ads, and marketing collateral.',
            'Collaborate with clients to iterate on concepts and deliver final assets.',
        ],
        whyCompany: [
            'Variety: Work with multiple exciting startup brands.',
            'Creative Freedom: Strong emphasis on original, boundary-pushing design.',
            'Compensation: $60k–$85k with contract extensions available.',
        ],
    },
];

// Collect all unique tags from jobs
const ALL_TAGS = Array.from(new Set(JOBS.flatMap((j) => j.tags)));
const COMPANIES = Array.from(new Set(JOBS.map((j) => j.company))).sort();
const DATE_FILTERS = ['All Time', 'Today', 'This Week', 'This Month'];

const APPLY_STEPS = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Resume' },
    { id: 3, label: 'Q&A' },
    { id: 4, label: 'Review' },
];

interface ApplyFormData {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    coverLetter: string;
    whyInterested: string;
    experience: string;
}

function ApplyModal({ job, onClose }: { job: typeof JOBS[0]; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<ApplyFormData>({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        coverLetter: '',
        whyInterested: '',
        experience: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = (field: keyof ApplyFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const canGoNext = (): boolean => {
        if (step === 1) return form.fullName.trim() !== '' && form.email.trim() !== '';
        if (step === 2) return selectedFile !== null;
        if (step === 3) return form.whyInterested.trim() !== '';
        return true;
    };

    const handleNext = () => {
        if (step < 4 && canGoNext()) setStep(step + 1);
    };
    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        console.log('Application submitted:', { ...form, file: selectedFile?.name });
        setSubmitted(true);
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
            setSelectedFile(file);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    // Success screen
    if (submitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-8 text-center"
                    style={{ animation: 'fadeInScale 0.3s ease-out' }}>
                    <div className="w-16 h-16 rounded-full bg-[#e6faf0] flex items-center justify-center mx-auto mb-5">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3CD894" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Application Submitted!</h3>
                    <p className="text-sm text-[#5a6a75] mb-6">
                        Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been sent successfully.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #3CD894, #2bb87a)' }}
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                style={{ animation: 'fadeInScale 0.3s ease-out' }}>

                {/* ── Header ── */}
                <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#f8fafc] flex items-center justify-between flex-shrink-0">
                    <h3 className="text-lg font-bold text-[#1a1a1a]">Apply for Job</h3>
                    <button onClick={onClose} className="text-[#9ca3af] hover:text-[#1a1a1a] transition-colors p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* ── Step Indicator ── */}
                <div className="px-6 pt-5 pb-3 flex-shrink-0">
                    <div className="flex items-center justify-between mb-1">
                        {APPLY_STEPS.map((s, i) => (
                            <div key={s.id} className="flex items-center flex-1 last:flex-none">
                                {/* Circle */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step > s.id
                                            ? 'bg-[#3CD894] text-white shadow-md shadow-[#3CD894]/30'
                                            : step === s.id
                                                ? 'bg-[#1e3a4f] text-white shadow-md shadow-[#1e3a4f]/30'
                                                : 'bg-[#f0f2f5] text-[#9ca3af]'
                                            }`}
                                    >
                                        {step > s.id ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : (
                                            s.id
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-semibold mt-1.5 ${step >= s.id ? 'text-[#1a1a1a]' : 'text-[#9ca3af]'
                                        }`}>
                                        {s.label}
                                    </span>
                                </div>
                                {/* Connector Line */}
                                {i < APPLY_STEPS.length - 1 && (
                                    <div className="flex-1 mx-2 mb-5">
                                        <div className="h-[2px] rounded-full bg-[#e5e7eb] relative overflow-hidden">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-[#3CD894] rounded-full transition-all duration-500"
                                                style={{ width: step > s.id ? '100%' : '0%' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Job Info Card ── */}
                <div className="mx-6 mb-4 p-3 bg-[#f8fafc] border border-[#e5e7eb] rounded-xl flex items-center gap-3 flex-shrink-0">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ backgroundColor: job.color }}
                    >
                        {job.initials}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-[#1a1a1a] truncate">{job.title}</p>
                        <p className="text-xs text-[#5a6a75] truncate">{job.company} &bull; {job.location}</p>
                    </div>
                    <svg className="ml-auto flex-shrink-0 text-[#3CD894]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                {/* ── Step Content (Scrollable) ── */}
                <div className="flex-1 overflow-y-auto px-6 pb-2">

                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="space-y-4" style={{ animation: 'slideIn 0.25s ease-out' }}>
                            <h4 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Personal Information</h4>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.fullName}
                                    onChange={(e) => updateField('fullName', e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="e.g. Juan Dela Cruz"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="juan@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Phone Number</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="+63 912 345 6789"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    value={form.linkedin}
                                    onChange={(e) => updateField('linkedin', e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Resume */}
                    {step === 2 && (
                        <div className="space-y-4" style={{ animation: 'slideIn 0.25s ease-out' }}>
                            <h4 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Resume / CV</h4>

                            {/* File Upload Area */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleFileDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver
                                    ? 'border-[#3CD894] bg-[#e6faf0]'
                                    : selectedFile
                                        ? 'border-[#3CD894] bg-[#f0fdf7]'
                                        : 'border-[#d1d5db] bg-[#f9fafb] hover:border-[#3CD894] hover:bg-[#fafffe]'
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                {selectedFile ? (
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-[#1a1a1a] truncate">{selectedFile.name}</p>
                                            <p className="text-xs text-[#5a6a75]">{formatFileSize(selectedFile.size)}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                                            className="p-1.5 rounded-full hover:bg-[#fee2e2] text-[#9ca3af] hover:text-red-500 transition-colors"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="mx-auto h-10 w-10 text-[#3CD894] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-sm font-semibold text-[#1a1a1a]">Tap to browse files</p>
                                        <p className="text-xs text-[#9ca3af] mt-1">Supports PDF, DOC, DOCX up to 5MB</p>
                                    </>
                                )}
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-[#1a1a1a]">Cover Letter</label>
                                    <span className="text-xs text-[#9ca3af]">Optional</span>
                                </div>
                                <textarea
                                    value={form.coverLetter}
                                    onChange={(e) => updateField('coverLetter', e.target.value)}
                                    rows={4}
                                    maxLength={500}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all resize-none"
                                    placeholder="Introduce yourself and explain why you're a good fit for this role..."
                                />
                                <p className="text-right text-xs text-[#9ca3af] mt-1">{form.coverLetter.length}/500</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Q&A */}
                    {step === 3 && (
                        <div className="space-y-4" style={{ animation: 'slideIn 0.25s ease-out' }}>
                            <h4 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Quick Questions</h4>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                                    Why are you interested in this role? <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    value={form.whyInterested}
                                    onChange={(e) => updateField('whyInterested', e.target.value)}
                                    rows={4}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all resize-none"
                                    placeholder="Share what excites you about this position..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                                    Describe your relevant experience
                                </label>
                                <textarea
                                    value={form.experience}
                                    onChange={(e) => updateField('experience', e.target.value)}
                                    rows={4}
                                    className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all resize-none"
                                    placeholder="Highlight any projects or skills that are relevant..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="space-y-4" style={{ animation: 'slideIn 0.25s ease-out' }}>
                            <h4 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Review Your Application</h4>

                            {/* Personal Info Review */}
                            <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4 space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-xs font-bold text-[#5a6a75] uppercase tracking-wider">Personal Info</h5>
                                    <button onClick={() => setStep(1)} className="text-xs font-semibold text-[#3CD894] hover:underline">Edit</button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <p className="text-[11px] text-[#9ca3af]">Name</p>
                                        <p className="text-[#1a1a1a] font-medium">{form.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#9ca3af]">Email</p>
                                        <p className="text-[#1a1a1a] font-medium truncate">{form.email}</p>
                                    </div>
                                    {form.phone && (
                                        <div>
                                            <p className="text-[11px] text-[#9ca3af]">Phone</p>
                                            <p className="text-[#1a1a1a] font-medium">{form.phone}</p>
                                        </div>
                                    )}
                                    {form.linkedin && (
                                        <div>
                                            <p className="text-[11px] text-[#9ca3af]">LinkedIn</p>
                                            <p className="text-[#1a1a1a] font-medium truncate">{form.linkedin}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Resume Review */}
                            <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4 space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-xs font-bold text-[#5a6a75] uppercase tracking-wider">Resume</h5>
                                    <button onClick={() => setStep(2)} className="text-xs font-semibold text-[#3CD894] hover:underline">Edit</button>
                                </div>
                                {selectedFile && (
                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        <p className="text-sm text-[#1a1a1a] font-medium">{selectedFile.name}</p>
                                        <p className="text-xs text-[#9ca3af]">({formatFileSize(selectedFile.size)})</p>
                                    </div>
                                )}
                                {form.coverLetter && (
                                    <div className="mt-2">
                                        <p className="text-[11px] text-[#9ca3af] mb-1">Cover Letter</p>
                                        <p className="text-sm text-[#5a6a75] leading-relaxed line-clamp-3">{form.coverLetter}</p>
                                    </div>
                                )}
                            </div>

                            {/* Q&A Review */}
                            <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4 space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-xs font-bold text-[#5a6a75] uppercase tracking-wider">Q&A</h5>
                                    <button onClick={() => setStep(3)} className="text-xs font-semibold text-[#3CD894] hover:underline">Edit</button>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#9ca3af] mb-0.5">Why interested?</p>
                                    <p className="text-sm text-[#5a6a75] leading-relaxed line-clamp-2">{form.whyInterested}</p>
                                </div>
                                {form.experience && (
                                    <div className="mt-2">
                                        <p className="text-[11px] text-[#9ca3af] mb-0.5">Experience</p>
                                        <p className="text-sm text-[#5a6a75] leading-relaxed line-clamp-2">{form.experience}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Footer Buttons ── */}
                <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between flex-shrink-0 bg-white">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#5a6a75] hover:text-[#1a1a1a] transition-colors rounded-xl hover:bg-[#f0f2f5]"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-medium text-[#5a6a75] hover:text-[#1a1a1a] transition-colors rounded-xl hover:bg-[#f0f2f5]"
                        >
                            Cancel
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            disabled={!canGoNext()}
                            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${canGoNext()
                                ? 'hover:opacity-90 hover:shadow-lg shadow-md'
                                : 'opacity-50 cursor-not-allowed'
                                }`}
                            style={{ background: canGoNext() ? 'linear-gradient(135deg, #3CD894, #2bb87a)' : '#9ca3af' }}
                        >
                            Next Step
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg shadow-md"
                            style={{ background: 'linear-gradient(135deg, #3CD894, #2bb87a)' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                            Submit Application
                        </button>
                    )}
                </div>

                {/* Inline Animations */}
                <style jsx>{`
                    @keyframes fadeInScale {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes slideIn {
                        from { opacity: 0; transform: translateX(12px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                `}</style>
            </div>
        </div>
    );
}

// Animated job card wrapper
function JobCard({
    job,
    isSelected,
    isBookmarked,
    onSelect,
    onBookmark,
    delay,
    visible,
}: {
    job: typeof JOBS[0];
    isSelected: boolean;
    isBookmarked: boolean;
    onSelect: () => void;
    onBookmark: (e: React.MouseEvent) => void;
    delay: number;
    visible: boolean;
}) {
    return (
        <div
            onClick={onSelect}
            style={{
                transitionDelay: `${delay}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            }}
            className={`bg-white rounded-2xl border p-5 hover:shadow-lg group cursor-pointer ${isSelected
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
                    onClick={onBookmark}
                    className="text-[#9ca3af] hover:text-[#1e3a4f] transition-colors p-1"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? '#1e3a4f' : 'none'} stroke={isBookmarked ? '#1e3a4f' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    );
}

export default function UserDashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDateFilter, setActiveDateFilter] = useState('All Time');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [bookmarked, setBookmarked] = useState<number[]>([]);
    const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const router = useRouter();
    const { isLoading, isAuthenticated, logout } = useAuth({ redirect: false });
    const [visibleIds, setVisibleIds] = useState<number[]>([]);
    const prevFilteredIds = useRef<number[]>([]);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllCompanies, setShowAllCompanies] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    useEffect(() => { document.title = 'Dashboard | AVAA'; }, []);

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

    // ─── Filtering Logic ──────────────────────────────────
    const filteredJobs = JOBS.filter((job) => {
        // Search: match title, company, location, or any tag
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                job.title.toLowerCase().includes(q) ||
                job.company.toLowerCase().includes(q) ||
                job.location.toLowerCase().includes(q) ||
                job.tags.some((tag) => tag.toLowerCase().includes(q));
            if (!matchesSearch) return false;
        }

        // Skills filter: job must have ALL selected skills as tags
        if (selectedSkills.length > 0) {
            const matches = selectedSkills.every((skill) => job.tags.includes(skill));
            if (!matches) return false;
        }

        // Company filter: job must belong to one of the selected companies
        if (selectedCompanies.length > 0) {
            if (!selectedCompanies.includes(job.company)) return false;
        }

        return true;
    });

    // ─── Animation: fade+slide cards in when filter changes ──
    useEffect(() => {
        const newIds = filteredJobs.map((j) => j.id);
        // First, hide removed cards
        const removed = prevFilteredIds.current.filter((id) => !newIds.includes(id));
        if (removed.length > 0) {
            setVisibleIds((prev) => prev.filter((id) => !removed.includes(id)));
        }
        // Then stagger-reveal new/remaining cards
        newIds.forEach((id, i) => {
            setTimeout(() => {
                setVisibleIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
            }, i * 60);
        });
        prevFilteredIds.current = newIds;
        // Close detail panel if selected job is filtered out
        if (selectedJob && !newIds.includes(selectedJob.id)) {
            setSelectedJob(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, selectedSkills, selectedCompanies, activeDateFilter]);

    // Initial load animation
    useEffect(() => {
        JOBS.forEach((job, i) => {
            setTimeout(() => {
                setVisibleIds((prev) => [...prev, job.id]);
            }, i * 80);
        });
        prevFilteredIds.current = JOBS.map((j) => j.id);
    }, []);

    if (isLoading) return null;

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {/* ─── Navbar ─── */}
            <nav className="sticky top-0 z-30 bg-white border-b border-[#e5e7eb] px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto">
                    {/* Logo */}
                    <Link href="/user/dashboard" className="flex items-center gap-2.5">
                        <Image src="/avaa_logo.png" alt="AVAA Logo" width={32} height={32} />
                        <span className="text-lg font-bold text-[#1e3a4f] tracking-wide hidden sm:block">AVAA</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: '#3CD894' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4z" />
                            </svg>
                            Jobs
                        </button>
                        {isAuthenticated && (
                            <>
                                <Link href="/user/profile" className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>
                                <Link href="/user/settings" className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                                    </svg>
                                    <span className="hidden sm:inline">Settings</span>
                                </Link>
                                <button
                                    onClick={() => setShowLogoutConfirm(true)}
                                    className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[#5a6a75] hover:bg-[#f0f2f5] transition-colors"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    <span className="hidden sm:inline">Sign Out</span>
                                </button>
                            </>
                        )}
                        {!isAuthenticated && !isLoading && (
                            <Link href="/user/signin" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: '#3CD894' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ─── Main Content ─── */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a] mb-1">Find Your Next Role</h1>
                        <p className="text-sm md:text-[15px] text-[#5a6a75]">Browse open positions from top companies</p>
                    </div>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#d1d5db] rounded-xl text-sm font-semibold text-[#1a1a1a] shadow-sm hover:bg-[#f9fafb]"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                        Filters
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* ─── Left Sidebar ─── */}
                    <aside className={`hidden lg:block flex-shrink-0 ${selectedJob ? 'w-[200px]' : 'w-[240px]'} transition-all duration-300`}>
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
                                        style={{
                                            transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease',
                                            transform: activeDateFilter === filter ? 'scale(1.05)' : 'scale(1)',
                                            boxShadow: activeDateFilter === filter ? '0 2px 8px rgba(30,58,79,0.18)' : 'none',
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeDateFilter === filter
                                            ? 'bg-[#1e3a4f] text-white'
                                            : 'bg-white border border-[#d1d5db] text-[#5a6a75] hover:bg-[#f0f2f5]'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Skills / Tags Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {(showAllSkills ? ALL_TAGS : ALL_TAGS.slice(0, 6)).map((skill) => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        style={{
                                            transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease',
                                            transform: selectedSkills.includes(skill) ? 'scale(1.07)' : 'scale(1)',
                                            boxShadow: selectedSkills.includes(skill) ? '0 2px 8px rgba(60,216,148,0.25)' : 'none',
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedSkills.includes(skill)
                                            ? 'bg-[#3CD894] text-white'
                                            : 'bg-white border border-[#d1d5db] text-[#5a6a75] hover:bg-[#f0f2f5]'
                                            }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                            {ALL_TAGS.length > 6 && (
                                <button
                                    onClick={() => setShowAllSkills(!showAllSkills)}
                                    className="mt-2 text-xs font-medium text-[#3CD894] hover:text-[#2bb87a] transition-colors"
                                >
                                    {showAllSkills ? 'Show Less' : `+${ALL_TAGS.length - 6} more`}
                                </button>
                            )}
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">Company</h3>
                            <div className="space-y-2">
                                {(showAllCompanies ? COMPANIES : COMPANIES.slice(0, 4)).map((company) => (
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
                            {COMPANIES.length > 4 && (
                                <button
                                    onClick={() => setShowAllCompanies(!showAllCompanies)}
                                    className="mt-2 text-xs font-medium text-[#3CD894] hover:text-[#2bb87a] transition-colors"
                                >
                                    {showAllCompanies ? 'Show Less' : `+${COMPANIES.length - 4} more`}
                                </button>
                            )}
                        </div>

                        {/* Clear Filters */}
                        {(selectedSkills.length > 0 || selectedCompanies.length > 0 || searchQuery.trim()) && (
                            <button
                                onClick={() => {
                                    setSelectedSkills([]);
                                    setSelectedCompanies([]);
                                    setSearchQuery('');
                                }}
                                style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                                className="mt-5 w-full px-3 py-2 rounded-lg text-xs font-semibold text-[#5a6a75] border border-[#d1d5db] hover:bg-[#f0f2f5] hover:text-[#1a1a1a] transition-colors flex items-center justify-center gap-1.5"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                Clear Filters
                            </button>
                        )}
                    </aside>

                    {/* ─── Job Cards Grid ─── */}
                    <main className={`min-w-0 transition-all duration-200 ${selectedJob
                        ? 'hidden lg:block lg:w-[340px] flex-shrink-0'
                        : 'flex-1'
                        }`}>
                        <div className={`grid gap-5 ${selectedJob ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
                            {filteredJobs.map((job, index) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isSelected={selectedJob?.id === job.id}
                                    isBookmarked={bookmarked.includes(job.id)}
                                    onSelect={() => {
                                        setSelectedJob(job);
                                        // On mobile, show details immediately? Or maybe just select it.
                                        // The current logic seems to just select.
                                    }}
                                    onBookmark={(e) => {
                                        e.stopPropagation();
                                        isAuthenticated ? toggleBookmark(job.id) : setShowAuthPrompt(true);
                                    }}
                                    delay={index * 50}
                                    visible={visibleIds.includes(job.id)}
                                />
                            ))}
                        </div>
                    </main>

                    {/* ─── Job Detail Panel (Desktop) ─── */}
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
                                            onClick={() => isAuthenticated ? setShowApplyModal(true) : setShowAuthPrompt(true)}
                                            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                                            style={{ background: '#3CD894' }}
                                        >
                                            APPLY NOW
                                        </button>
                                        <button
                                            onClick={() => isAuthenticated ? toggleBookmark(selectedJob.id) : setShowAuthPrompt(true)}
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

            {/* ─── Mobile Filters Modal ─── */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white animate-in slide-in-from-bottom duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                        <h2 className="text-lg font-bold text-[#1a1a1a]">Filters</h2>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="p-2 text-[#5a6a75] hover:bg-[#f0f2f5] rounded-full"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Reusing Sidebar Content */}
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 border border-[#d1d5db] rounded-xl text-sm text-[#1a1a1a] placeholder-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all shadow-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3 uppercase tracking-wider">Date Posted</h3>
                            <div className="flex flex-wrap gap-2">
                                {DATE_FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveDateFilter(filter)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeDateFilter === filter
                                            ? 'bg-[#1e3a4f] text-white shadow-md'
                                            : 'bg-white border border-[#d1d5db] text-[#5a6a75] hover:bg-[#f0f2f5]'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3 uppercase tracking-wider">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {ALL_TAGS.map((skill) => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSkills.includes(skill)
                                            ? 'bg-[#3CD894] text-white shadow-md'
                                            : 'bg-white border border-[#d1d5db] text-[#5a6a75] hover:bg-[#f0f2f5]'
                                            }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3 uppercase tracking-wider">Company</h3>
                            <div className="space-y-3">
                                {COMPANIES.map((company) => (
                                    <label key={company} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-[#f9fafb] rounded-lg transition-colors">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCompanies.includes(company) ? 'bg-[#3CD894] border-[#3CD894]' : 'border-[#d1d5db] bg-white'}`}>
                                            {selectedCompanies.includes(company) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedCompanies.includes(company)}
                                            onChange={() => toggleCompany(company)}
                                            className="hidden"
                                        />
                                        <span className="text-sm font-medium text-[#5a6a75] group-hover:text-[#1a1a1a] transition-colors">{company}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-[#e5e7eb] flex gap-3">
                        <button
                            onClick={() => {
                                setSelectedSkills([]);
                                setSelectedCompanies([]);
                                setActiveDateFilter('All Time');
                                setSearchQuery('');
                            }}
                            className="flex-1 py-3 text-sm font-semibold text-[#5a6a75] bg-[#f0f2f5] rounded-xl hover:bg-[#e5e7eb] transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="flex-1 py-3 text-sm font-semibold text-white rounded-xl shadow-md transition-opacity hover:opacity-90"
                            style={{ background: '#3CD894' }}
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            )}

            {/* ─── Mobile Job Details Overlay ─── */}
            {selectedJob && (
                <div className="fixed inset-0 z-40 lg:hidden bg-white animate-in slide-in-from-right duration-300 flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-[#e5e7eb] bg-white sticky top-0 z-10">
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="p-2 -ml-2 text-[#5a6a75] hover:text-[#1a1a1a] hover:bg-[#f0f2f5] rounded-full transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="text-base font-bold text-[#1a1a1a] truncate flex-1">{selectedJob.title}</h2>
                        <button
                            onClick={() => toggleBookmark(selectedJob.id)}
                            className="text-[#9ca3af] hover:text-[#1e3a4f] transition-colors p-2"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill={bookmarked.includes(selectedJob.id) ? '#1e3a4f' : 'none'} stroke={bookmarked.includes(selectedJob.id) ? '#1e3a4f' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5 pb-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-sm"
                                style={{ backgroundColor: selectedJob.color }}
                            >
                                {selectedJob.initials}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">{selectedJob.company}</h2>
                                <p className="text-sm text-[#5a6a75]">{selectedJob.location}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedJob.type === 'Full-time' ? 'bg-[#e6f7f2] text-[#3CD894]' : 'bg-[#fef3e2] text-[#b8860b]'}`}>
                                {selectedJob.type}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f0f2f5] text-[#5a6a75] flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                {selectedJob.timeAgo}
                            </span>
                        </div>

                        <p className="text-xl font-bold text-[#1a1a1a] mb-8">{selectedJob.salary}</p>

                        <div className="space-y-8">
                            <section>
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-3">Position</h3>
                                <p className="text-[15px] text-[#5a6a75] leading-relaxed">{selectedJob.position}</p>
                            </section>

                            <section>
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedJob.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#e6faf0] text-[#3CD894] border border-[#d1fae5]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-3">Description</h3>
                                <p className="text-[15px] text-[#5a6a75] leading-relaxed mb-4">{selectedJob.description}</p>
                            </section>

                            <section>
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-3">What You&apos;ll Do</h3>
                                <ul className="space-y-3">
                                    {selectedJob.whatYoullDo.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-[15px] text-[#5a6a75] leading-relaxed">
                                            <span className="text-[#3CD894] font-bold text-lg leading-none mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-3">Why {selectedJob.company}?</h3>
                                <ul className="space-y-3">
                                    {selectedJob.whyCompany.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-[15px] text-[#5a6a75] leading-relaxed">
                                            <span className="text-[#3CD894] font-bold text-lg leading-none mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Fixed Apply Button */}
                    <div className="p-4 border-t border-[#e5e7eb] bg-white absolute bottom-0 left-0 right-0">
                        <button
                            onClick={() => isAuthenticated ? setShowApplyModal(true) : setShowAuthPrompt(true)}
                            className="w-full py-3.5 rounded-xl text-base font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
                            style={{ background: '#3CD894' }}
                        >
                            APPLY NOW
                        </button>
                    </div>
                </div>
            )}

            {/* ─── Multi-Step Apply Modal ─── */}
            {showApplyModal && selectedJob && (
                <ApplyModal
                    job={selectedJob}
                    onClose={() => setShowApplyModal(false)}
                />
            )}
            {/* ─── Sign Out Confirmation Modal ─── */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-[fadeIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">Sign Out</h3>
                            <p className="text-sm text-[#5a6a75] mb-6">Are you sure you want to sign out of your account?</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#d1d5db] text-sm font-semibold text-[#5a6a75] hover:bg-[#f5f7fa] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { localStorage.removeItem('token'); router.push('/user/signin'); }}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Auth Prompt Modal ─── */}
            <AuthPromptModal isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
        </div>
    );
}
