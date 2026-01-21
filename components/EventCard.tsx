import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Video, Clock } from "lucide-react";

interface EventCardProps {
    day: string;
    month: string;
    type: "Workshop" | "Live Lesson" | "Seminar" | "Meeting";
    title: string;
    time: string;
    location?: string;
    isOnline?: boolean;
    description: string;
    category?: string;
}

export default function EventCard({
    day,
    month,
    type,
    title,
    time,
    location,
    isOnline,
    description,
}: EventCardProps) {
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

    return (
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
                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium">
                    Register
                </Button>
                <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50">
                    Details
                </Button>
            </div>
        </div>
    );
}
