"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="bg-blue-900 text-white p-1 rounded-md">
                    <GraduationCap size={24} />
                </div>
                <span className="text-xl font-bold text-blue-900 font-outfit">EduStream</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
                <Link href="#" className="hover:text-blue-900 transition-colors">About</Link>
                <Link href="#" className="hover:text-blue-900 transition-colors">Gallery</Link>
                <Link href="/events" className="hover:text-blue-900 transition-colors">Event</Link>
                <Link href="#" className="hover:text-blue-900 transition-colors">Contact Us</Link>
            </div>

            <div className="flex items-center gap-4">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6">
                    Get Started
                </Button>
            </div>
        </nav>
    );
}
