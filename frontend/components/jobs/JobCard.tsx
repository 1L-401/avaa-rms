"use client";
import { Bookmark } from "lucide-react";

export default function JobCard({ job, onToggleSave }: { job: any, onToggleSave: (id: string) => void }) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm relative transition-all hover:shadow-md">
      <button 
        onClick={() => onToggleSave(job.id)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50"
      >
        <Bookmark 
          className={job.isSaved ? "fill-teal-600 text-teal-600" : "text-gray-400"} 
          size={20}
        />
      </button>
      
      {/* Job Info Layout */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold">
          {job.companyInitials}
        </div>
        <div>
          <h3 className="font-bold text-lg">{job.title}</h3>
          <p className="text-gray-500 text-sm">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium">
        {job.tags?.map((tag: string) => (
          <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Salary Range</p>
          <p className="font-bold text-sm">{job.salary}</p>
        </div>
        <button className="px-4 py-2 bg-teal-600/10 text-teal-700 rounded-lg font-semibold text-sm hover:bg-teal-600/20">
          View Details
        </button>
      </div>
    </div>
  );
}