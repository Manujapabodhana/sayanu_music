export interface Event {
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

export interface RegistrationDto {
    eventId: number;
    userEmail: string;
    userName: string;
}

const API_URL = 'http://127.0.0.1:4000';

export async function fetchEvents(): Promise<Event[]> {
    try {
        const res = await fetch(`${API_URL}/events`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export async function registerForEvent(data: RegistrationDto): Promise<any> {
    const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error('Registration failed');
    }
    return res.json();
}

export interface Teacher {
    id: number;
    name: string;
    photo: string;
    instruments: string[];
    rating: number;
    hourlyRate: number;
    bio: string;
}

export interface TeacherResponse {
    data: Teacher[];
    total: number;
}

export async function fetchTeachers(page: number = 1, limit: number = 10, sort: 'DESC' | 'ASC' = 'DESC'): Promise<TeacherResponse> {
    try {
        const res = await fetch(`${API_URL}/teachers?page=${page}&limit=${limit}&sort=${sort}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch teachers');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return { data: [], total: 0 };
    }
}
