"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 px-6 text-center bg-gradient-to-b from-white to-blue-50/50">
            <div className="max-w-4xl mx-auto space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] font-outfit tracking-tight"
                >
                    Empowering Education Everywhere
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                    We are <span className="font-semibold text-gray-900">building</span> the <span className="font-semibold text-gray-900">future</span> of live digital <span className="font-semibold text-gray-900">learning</span>. A seamless, high-performance platform where teachers and students connect in real-time, regardless of geography.
                </motion.p>
            </div>

            {/* Decorative gradient blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-10 opacity-40 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl mix-blend-multiply animate-blob" />
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
            </div>
        </section>
    );
}
