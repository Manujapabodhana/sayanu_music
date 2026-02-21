"use client";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { VideoCall } from "@/components/VideoCall";

export default function RoomClient({
    appId,
    channelName,
    token,
    uid
}: {
    appId: string,
    channelName: string,
    token: string,
    uid?: string | number
}) {
    // Ensure client is created only once
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    return (
        <AgoraRTCProvider client={client}>
            <VideoCall
                appId={appId}
                channelName={channelName}
                token={token}
                uid={uid}
            />
        </AgoraRTCProvider>
    );
}
