import Image from "next/image";
import { Star, DollarSign, Award } from "lucide-react";

interface Teacher {
    id: number;
    name: string;
    photo: string;
    instruments: string[];
    rating: number;
    hourlyRate: number;
    bio: string;
}

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col h-full">
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={teacher.photo}
                    alt={teacher.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-slate-800 shadow-sm">
                    <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                    {teacher.rating.toFixed(1)}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-3 flex-wrap">
                    {Array.isArray(teacher.instruments) && teacher.instruments.map((inst, i) => (
                        <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {inst}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{teacher.name}</h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">{teacher.bio}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center text-slate-700 font-bold">
                        <DollarSign className="w-4 h-4 mr-0.5" />
                        {teacher.hourlyRate}<span className="text-slate-400 text-sm font-normal ml-1">/hr</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
