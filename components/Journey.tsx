"use client";

import { motion } from "framer-motion";

const phases = [
    {
        phase: "Phase 1",
        time: "STARTUP",
        title: "Concept & Curriculum",
        description: "We started by gathering a network of expert musicians and designing a comprehensive curriculum suitable for online instruction."
    },
    {
        phase: "Phase 2",
        time: "LAUNCH",
        title: "Platform Beta",
        description: "Launched our first version to a select group of students, facilitating easy booking and secure connections with teachers."
    },
    {
        phase: "Phase 3",
        time: "EXPANSION",
        title: "Interactive Classrooms",
        description: "Introduced high-quality video tools, shared virtual music sheets, and session recording capabilities to enhance the learning experience."
    },
    {
        phase: "Phase 4",
        time: "PRESENT",
        title: "Global Community",
        description: "Now serving thousands of learners worldwide with masterclasses, recitals, and a diverse range of musical instruments."
    }
];

export default function Journey() {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-[#0F172A]">Our Journey</h2>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[27px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-blue-100" />

                    <div className="space-y-12">
                        {phases.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start relative ${index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"
                                    }`}
                            >
                                {/* Phase Info */}
                                <div className="flex-1 md:mt-2 pl-16 md:pl-0">
                                    <div className={`flex flex-col ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                                        <span className="text-blue-900 font-bold text-lg">{item.phase}</span>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">{item.time}</span>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-[56px] h-[56px] flex items-center justify-center">
                                    <div className="w-4 h-4 bg-blue-900 rounded-full border-4 border-white shadow-sm z-10" />
                                </div>

                                {/* Description content */}
                                <div className="flex-1 pl-16 md:pl-0 pt-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
