import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EventsPage() {
    const events = [
        {
            id: 1,
            day: "24",
            month: "OCT",
            type: "Workshop",
            title: "Introduction to Jazz Piano",
            time: "10:00 AM - 12:00 PM",
            isOnline: false,
            location: "Music Hall A",
            description: "A deep dive into jazz improvisation and harmony. Learn the basics of jazz piano, including 7th chords, swing rhythm, and blues scales. Ideal for intermediate players.",
        },
        {
            id: 2,
            day: "28",
            month: "OCT",
            type: "Live Lesson",
            title: "Advanced Classical Techniques",
            time: "Live Session",
            isOnline: true,
            description: "Weekly live lesson focusing on advanced finger independence and articulation. Required session for advanced piano students preparing for recitals.",
        },
        {
            id: 3,
            day: "02",
            month: "NOV",
            type: "Seminar",
            title: "The History of the Grand Piano",
            time: "02:00 PM - 04:00 PM",
            isOnline: false,
            location: "Main Auditorium",
            description: "Annual guest lecture by industry experts on the evolution of the piano. Discover how the instrument has changed over centuries.",
        },
        {
            id: 4,
            day: "05",
            month: "NOV",
            type: "Meeting",
            title: "Parents & Teachers Assoc.",
            time: "05:00 PM - 06:30 PM",
            isOnline: false,
            location: "Conference Room B",
            description: "Open forum for parents to discuss the upcoming semester curriculum updates and feedback on the new live lesson platform.",
        },
    ];

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />

            <div className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Upcoming Events</h1>
                        <p className="text-gray-500 max-w-xl">
                            Discover workshops, live seminars, and piano activities for the coming weeks.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-sm text-gray-500 mb-1">Total Events</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-sm text-gray-500 mb-1">This Week</p>
                            <p className="text-2xl font-bold text-blue-900">8</p>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="sticky top-[80px] z-40">
                    <EventFilter />
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {events.map((event) => (
                        // @ts-ignore
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>

                {/* Pagination / Results Count */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">4</span> of <span className="font-medium text-gray-900">24</span> results
                    </p>
                    {/* Simple Pagination Placeholder */}
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>&lt;</Button>
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-900">1</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">...</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">&gt;</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
