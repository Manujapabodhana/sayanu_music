"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutSystem() {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/music_learning.png"
                                alt="Online Music Learning Experience"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-block bg-blue-50 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                            About EduStream
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold font-outfit text-[#0F172A] leading-tight">
                            A Modern Era for <span className="text-blue-600">Music Education</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Welcome to <span className="font-semibold text-gray-900">EduStream</span>, a modern online music learning platform built to deliver high-quality music education that is accessible, flexible, and engaging for learners of all ages and skill levels.
                            </p>
                            <p>
                                Our platform brings together students, parents, and experienced music teachers in one secure and easy-to-use digital space, simplifying every part of the learning journey.
                            </p>
                            <p>
                                From discovering the right teacher and booking lessons to attending live sessions and reviewing recorded lessons, we make music education organized, effective, and enjoyable for everyone involved.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {["Accessible", "Flexible", "Engaging", "Secure"].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                    <CheckCircle2 size={16} className="text-teal-500" />
                                    <span className="font-medium text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
