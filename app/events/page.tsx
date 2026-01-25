import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetchEvents } from "@/lib/api";

export default async function EventsPage() {
    const events = await fetchEvents();

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
                            <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 min-w-[140px]">
                            <p className="text-sm text-gray-500 mb-1">This Week</p>
                            <p className="text-2xl font-bold text-blue-900">0</p>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="sticky top-[80px] z-40">
                    <EventFilter />
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {events.length > 0 ? (
                        events.map((event) => (
                            // @ts-ignore
                            <EventCard key={event.id} {...event} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No events found. Check backend connection.</p>
                        </div>
                    )}
                </div>

                {/* Pagination / Results Count */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-medium text-gray-900">{events.length > 0 ? 1 : 0}</span> to <span className="font-medium text-gray-900">{events.length}</span> of <span className="font-medium text-gray-900">{events.length}</span> results
                    </p>
                    {/* Simple Pagination Placeholder */}
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>&lt;</Button>
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-900">1</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">...</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">&gt;</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
