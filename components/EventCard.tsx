"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Video, Clock, X, CheckCircle2, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerForEvent } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EventCardProps {
    id: number;
    day: string;
    month: string;
    type: string;
    title: string;
    time: string;
    location?: string;
    isOnline: boolean;
    description: string;
    category?: string;
}

export default function EventCard({
    id,
    day,
    month,
    type,
    title,
    time,
    location,
    isOnline,
    description,
}: EventCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentAmount] = useState(50); // Event registration fee in USD

    const getTypeColor = () => {
        switch (type) {
            case "Workshop":
                return "bg-green-100 text-green-700";
            case "Live Lesson":
                return "bg-purple-100 text-purple-700";
            case "Seminar":
                return "bg-gray-100 text-gray-700";
            case "Meeting":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-blue-100 text-blue-700";
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Create Stripe checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: id,
                    eventTitle: title,
                    userName: formData.name,
                    userEmail: formData.email,
                    amount: paymentAmount,
                }),
            });

            const { sessionId, url } = await response.json();

            if (url) {
                // Redirect to Stripe Checkout
                window.location.href = url;
            } else {
                throw new Error('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert("Payment failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                {/* Date Badge */}
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-blue-50/50 rounded-xl flex flex-col items-center justify-center text-blue-900">
                        <span className="text-2xl font-bold">{day}</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">{month}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${getTypeColor()}`}>
                            {type}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            {isOnline ? (
                                <>
                                    <Video size={14} />
                                    <span>Live Session</span>
                                </>
                            ) : (
                                <>
                                    <MapPin size={14} />
                                    <span>{location}</span>
                                </>
                            )}
                            <span className="w-1 h-1 rounded-full bg-gray-300 mx-1"></span>
                            <Clock size={14} />
                            <span>{time}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 justify-center min-w-[120px]">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium"
                    >
                        Register
                    </Button>
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
                        Details
                    </Button>
                </div>
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">Register for Event</h3>
                                <p className="text-gray-500 text-sm mb-6">Fill in your details to secure your spot for <span className="font-semibold text-blue-900">{title}</span>.</p>

                                {isSuccess ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h4 className="text-xl font-bold text-green-700">Registration Successful!</h4>
                                        <p className="text-gray-500">we've sent a confirmation to your email.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        {/* Payment Info */}
                                        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">Registration Fee</span>
                                                <span className="text-lg font-bold text-blue-900">${paymentAmount}.00</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <CreditCard size={14} />
                                                <span>Secure payment via Stripe</span>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-6 mt-2"
                                        >
                                            {isSubmitting ? "Processing..." : `Pay $${paymentAmount} & Register`}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
