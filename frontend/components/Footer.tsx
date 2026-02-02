import { GraduationCap, Facebook, Globe, Share2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1E3A8A] text-white pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-white text-blue-900 p-1 rounded-md">
                            <GraduationCap size={20} />
                        </div>
                        <span className="text-xl font-bold font-outfit">EduStream</span>
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
                        The ultimate educational platform for live video lessons, content management, and automated student payments.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-blue-200 hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-blue-200 hover:text-white transition-colors"><Globe size={20} /></a>
                        <a href="#" className="text-blue-200 hover:text-white transition-colors"><Share2 size={20} /></a>
                    </div>
                </div>

                {/* Links Column 1 - Spacer/Empty in design or merged? Design shows Platform and Contact Us */}
                <div className="lg:col-span-1"></div>

                {/* Platform */}
                <div>
                    <h4 className="font-bold mb-6 text-lg">Platform</h4>
                    <ul className="space-y-4 text-blue-100 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Video Integration</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Payment Gateways</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Schedule Builder</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">CMS Tools</a></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
                    <ul className="space-y-4 text-blue-100 text-sm">
                        <li className="flex items-center gap-3">
                            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                            hello@edustream.com.au
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                            Sydney, NSW, Australia
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                            +61 (02) 9000 0000
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-blue-800 text-center text-blue-300 text-xs">
                © 2024 EduStream Live Pty Ltd. All rights reserved.
            </div>
        </footer>
    );
}
