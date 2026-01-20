"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Emily Grace",
        role: "Violin Student",
        feedback: "The live sessions are incredibly smooth! I can see my teacher's bowing technique clearly, and the recording feature helps me practice better.",
        image: "/assets/student_1.png"
    },
    {
        name: "Liam Carter",
        role: "Guitar Enthusiast",
        feedback: "Booking lessons is so easy. I found an amazing instructor who specializes in fingerstyle guitar, and my progress has been skyrocketing!",
        image: "/assets/student_2.png"
    },
    {
        name: "Robert Fox",
        role: "Piano Learner",
        feedback: "As an adult learner, flexibility is key. EduStream lets me schedule classes around my work, and the video quality is just perfect.",
        image: "/assets/student_3.png"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-blue-600 font-bold tracking-wider uppercase text-sm"
                    >
                        Student Success Stories
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-slate-900 font-outfit"
                    >
                        Loved by Learners Worldwide
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 relative group"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-8 right-8 text-blue-100 group-hover:text-blue-50 transition-colors">
                                <Quote size={64} fill="currentColor" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                {/* Feedback Text */}
                                <p className="text-slate-600 leading-relaxed text-lg italic">
                                    "{item.feedback}"
                                </p>

                                {/* User Info */}
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-blue-600 text-sm font-medium">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
