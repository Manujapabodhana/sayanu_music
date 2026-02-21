import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchEvents } from "@/lib/api";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
    const events = await fetchEvents();

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <Navbar />

            <EventsClient events={events} />

            <Footer />
        </main>
    );
}
