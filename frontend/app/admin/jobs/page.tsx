'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const JOBS = [
    {
        id: 1,
        initials: 'TN',
        color: '#1e3a4f',
        title: 'Senior Frontend Developer',
        company: 'TechNova',
        location: 'San Francisco, CA',
        status: 'Active',
        applications: 52,
        posted: '2026-02-07',
    },
    {
        id: 2,
        initials: 'DS',
        color: '#3CD894',
        title: 'Backend Engineer',
        company: 'DataStream',
        location: 'New York, NY',
        status: 'Active',
        applications: 31,
        posted: '2026-02-06',
    },
    {
        id: 3,
        initials: 'CH',
        color: '#1e3a4f',
        title: 'UX/UI Designer',
        company: 'CreativeHub',
        location: 'Remote',
        status: 'Active',
        applications: 43,
        posted: '2026-02-05',
    },
    {
        id: 4,
        initials: 'CS',
        color: '#2a5a6e',
        title: 'DevOps Engineer',
        company: 'CloudScale',
        location: 'Austin, TX',
        status: 'Active',
        applications: 19,
        posted: '2026-02-04',
    },
    {
        id: 5,
        initials: 'IT',
        color: '#3CD894',
        title: 'Product Manager',
        company: 'InnovateTech',
        location: 'Seattle, WA',
        status: 'Active',
        applications: 20,
        posted: '2026-02-03',
    },
    {
        id: 6,
        initials: 'AP',
        color: '#1e3a4f',
        title: 'Data Scientist',
        company: 'AnalyticsPro',
        location: 'Boston, MA',
        status: 'Active',
        applications: 12,
        posted: '2026-02-02',
    },
];

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = 'Job Management | Admin Panel';
    }, []);

    const filteredJobs = JOBS.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
                    <p className="text-gray-500 mt-1">{filteredJobs.length} total jobs</p>
                </div>

                {/* Search and Add Button */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 w-full sm:w-56 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CD894] focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3CD894] text-[#0f172a] font-semibold rounded-xl hover:bg-[#32c584] transition-colors duration-200">
                        <Plus size={18} />
                        Add Job
                    </button>
                </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Job
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Status
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Applications
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">
                                    Posted
                                </th>
                                <th className="text-right text-sm font-medium text-gray-500 px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.map((job) => (
                                <tr
                                    key={job.id}
                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    {/* Job Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                                style={{ backgroundColor: job.color }}
                                            >
                                                {job.initials}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{job.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {job.company} - {job.location}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Column */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                                                job.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : job.status === 'Closed'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {job.status}
                                        </span>
                                    </td>

                                    {/* Applications Column */}
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700">{job.applications}</span>
                                    </td>

                                    {/* Posted Column */}
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700">{job.posted}</span>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredJobs.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-gray-500">No jobs found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
