"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Music2 } from "lucide-react";
import { useRef } from "react";

// Mock Data for 10 Piano Teachers
const teamMembers = [
    {
        name: "Arthur Pendelton",
        role: "Classical Piano Maestro",
        desc: "Renowned for his mastery of Beethoven and Chopin, bringing 30 years of concert experience.",
        image: "/assets/piano_teacher_1.png"
    },
    {
        name: "Lila Vaughn",
        role: "Jazz Improvisation Expert",
        desc: "Teaches the art of swing, bebop, and modern jazz fusion with creative freedom.",
        image: "/assets/piano_teacher_2.png"
    },
    {
        name: "Sarah Chen",
        role: "Beginner Specialist",
        desc: "Patient and encouraging, perfect for students taking their very first steps in piano.",
        image: "/assets/sarah_chen.png"
    },
    {
        name: "Marcus Thorne",
        role: "Advanced Composition",
        desc: "Guiding students to write their own masterpieces while mastering the keys.",
        image: "/assets/marcus_thorne.png"
    },
    {
        name: "Ms. Daisy",
        role: "Kids Piano Fun",
        desc: "Making piano learning a magical adventure for children ages 4-10.",
        image: "/assets/piano_teacher_3.png"
    },
    {
        name: "Dr. James Wilson",
        role: "Music Theory & Harmony",
        desc: "Understanding the 'why' behind the music to unlock deeper performance.",
        image: "/assets/piano_teacher_4.png"
    },
    {
        name: "Elena Rodriguez",
        role: "Latin Jazz Piano",
        desc: "Infusing rhythmic complexity and latin grooves into your repertoire.",
        image: "/assets/elena_rodriguez.png"
    },
    {
        name: "Sofia Kovar",
        role: "Piano Virtuoso Coach",
        desc: "High-level technical training for competitive pianists and performance majors.",
        image: "/assets/piano_teacher_5.png"
    },
    {
        name: "Jax Miller",
        role: "Modern Pop & Synth",
        desc: "Learn to play top 40 hits, accompany singers, and master synthesizers.",
        image: "/assets/piano_teacher_6.png"
    },
    {
        name: "Leo Vance",
        role: "Sight Reading Expert",
        desc: "Building rock-solid reading skills to play any piece of music on sight.",
        image: "/assets/james_wilson.png"
    }
];

export default function Team() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Approx card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-24 px-6 bg-slate-50 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm"
                        >
                            <Music2 size={18} />
                            <span>World-Class Instructors</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold font-outfit text-slate-900"
                        >
                            Meet Our Piano Maestros
                        </motion.h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm active:scale-95"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm active:scale-95"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory px-4 -mx-4 scroll-smooth"
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="min-w-[320px] md:min-w-[360px] snap-start bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-slate-100"
                        >
                            <div className="relative h-96 w-full overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{member.name}</h3>
                                    <p className="text-slate-300 font-medium tracking-wide uppercase text-xs mb-4">{member.role}</p>
                                </div>
                            </div>

                            <div className="p-8 pt-6 bg-white relative">
                                {/* Floating Action Button (Visual only for now) */}
                                <div className="absolute -top-6 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                                    <ChevronRight size={20} />
                                </div>

                                <p className="text-slate-600 leading-relaxed">
                                    {member.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
