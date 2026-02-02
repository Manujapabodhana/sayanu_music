"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            // Confirm payment and save registration
            fetch('/api/confirm-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session_id: sessionId }),
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.error('Failed to confirm payment:', error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />

            <div className="flex-grow w-full max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={48} className="text-green-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Payment Successful!
                            </h1>
                            <p className="text-lg text-gray-600">
                                Your event registration has been confirmed
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calendar className="text-blue-900" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Your Booking</p>
                                    <p className="font-semibold text-gray-900">Event registration completed</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-blue-900" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Confirmation Email</p>
                                    <p className="font-semibold text-gray-900">Check your inbox for details</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <Link href="/events">
                                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-6">
                                    Browse More Events
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-6">
                                    Return to Home
                                </Button>
                            </Link>
                        </div>

                        {sessionId && (
                            <p className="text-xs text-gray-400 pt-4">
                                Session ID: {sessionId}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
