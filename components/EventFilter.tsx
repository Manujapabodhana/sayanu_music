"use client";

import { Search, ChevronDown } from "lucide-react";

export default function EventFilter() {
    return (
        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-grow w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 focus:ring-0 text-sm md:text-base"
                />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0 md:pl-2">
                <div className="relative w-full md:w-[180px]">
                    <select className="appearance-none w-full bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 font-medium cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-blue-100">
                        <option>All Categories</option>
                        <option>Piano Lessons</option>
                        <option>Workshops</option>
                        <option>Masterclasses</option>
                        <option>Seminars</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        <ChevronDown size={14} />
                    </div>
                </div>

                <div className="relative w-full md:w-[150px]">
                    <select className="appearance-none w-full bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 font-medium cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-blue-100">
                        <option>This Month</option>
                        <option>Valid Month</option>
                        <option>Next Month</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        <ChevronDown size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
}
