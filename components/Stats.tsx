"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, Clock, Video, TrendingUp } from "lucide-react";

const stats = [
    {
        label: "Expert Teachers",
        value: "20+",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        gradient: "from-blue-500/10 to-cyan-500/10",
        hoverBorder: "group-hover:border-blue-200"
    },
    {
        label: "Active Students",
        value: "500+",
        icon: GraduationCap,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        gradient: "from-purple-500/10 to-pink-500/10",
        hoverBorder: "group-hover:border-purple-200"
    },
    {
        label: "Session Duration",
        value: "30m",
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        gradient: "from-amber-500/10 to-orange-500/10",
        hoverBorder: "group-hover:border-amber-200"
    },
    {
        label: "Hours Streamed",
        value: "10k+",
        icon: Video,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        gradient: "from-emerald-500/10 to-teal-500/10",
        hoverBorder: "group-hover:border-emerald-200"
    },
];

export default function Stats() {
    return (
        <section className="py-20 px-6 bg-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-50">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider"
                    >
                        <TrendingUp size={14} />
                        <span>Our Impact</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit"
                    >
                        Growing Community
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`relative bg-white/60 backdrop-blur-xl border ${stat.border} p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 ${stat.hoverBorder}`}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={28} strokeWidth={2.5} />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-outfit">
                                            {stat.value}
                                        </h3>
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
