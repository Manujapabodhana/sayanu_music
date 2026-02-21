import RoomClient from "@/components/RoomClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: PageProps) {
    const { id } = await params;
    const channelName = `event-${id}`;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/events/${id}/token`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch token');
        }

        const { token } = await res.json();
        const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID || '';

        if (!appId) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
                    <div className="text-center p-6 bg-white shadow-lg rounded-xl">
                        <h1 className="text-2xl font-bold mb-2">Configuration Error</h1>
                        <p>Agora App ID is missing in environment variables.</p>
                    </div>
                </div>
            );
        }

        return (
            <main className="min-h-screen bg-slate-950 flex flex-col">
                <div className="flex-grow p-4 md:p-6 h-screen">
                    <RoomClient
                        appId={appId}
                        channelName={channelName}
                        token={token}
                    />
                </div>
            </main>
        );

    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
                <div className="text-center p-6 bg-white shadow-lg rounded-xl">
                    <h1 className="text-2xl font-bold mb-2">Unable to Join Room</h1>
                    <p className="text-slate-500">{String(error)}</p>
                </div>
            </div>
        );
    }
}
