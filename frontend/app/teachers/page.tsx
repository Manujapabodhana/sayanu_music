import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchTeachers } from "@/lib/api";
import TeacherList from "./TeacherList";
import { Music2 } from "lucide-react";

export default async function TeachersPage() {
    const { data, total } = await fetchTeachers(1, 10);

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-slate-900 py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">
                        <Music2 size={18} />
                        <span>World-Class Instructors</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-outfit text-white mb-6">
                        Find Your Perfect Piano Teacher
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Browse our curated list of expert instructors. Filter by rating, experience, and style to find the perfect match for your musical journey.
                    </p>
                </div>
            </section>

            <TeacherList initialTeachers={data} initialTotal={total} />

            <Footer />
        </main>
    );
}
