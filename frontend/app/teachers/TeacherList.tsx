"use client";

import { useState, useEffect } from "react";
import TeacherCard from "@/components/TeacherCard";
import { Teacher, fetchTeachers } from "@/lib/api";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface TeacherListProps {
    initialTeachers: Teacher[];
    initialTotal: number;
}

export default function TeacherList({ initialTeachers, initialTotal }: TeacherListProps) {
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [total, setTotal] = useState(initialTotal);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        if (page === 1 && initialTeachers.length > 0 && !loading) return;

        const loadTeachers = async () => {
            setLoading(true);
            const res = await fetchTeachers(page, limit);
            setTeachers(res.data);
            setTotal(res.total);
            setLoading(false);
        };

        loadTeachers();
    }, [page]); // Removed initialTeachers dependency to avoid loop if object ref changes

    const handleNext = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(p => p - 1);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {teachers.map(teacher => (
                            <TeacherCard key={teacher.id} teacher={teacher} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12 gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-slate-600" />
                            </button>
                            <span className="text-slate-600 font-medium">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-slate-600" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
