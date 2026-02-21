"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Link from 'next/link';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
}

export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/events`);
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                }
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
                </header>

                {loading ? (
                    <div className="text-center py-12">Loading classes...</div>
                ) : events.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-lg shadow">
                        No active classes found.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800">{event.title}</h2>
                                    <p className="text-slate-500 mt-1">{new Date(event.date).toLocaleString()}</p>
                                </div>
                                <Link href={`/room/${event.id}`}>
                                    <Button className="gap-2">
                                        <Video className="w-4 h-4" />
                                        Join Class
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
