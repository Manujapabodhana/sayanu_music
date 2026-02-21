import AgoraRTC, {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { useState, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, ChevronDown, ChevronUp, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Chat from "./Chat";
import { useScreenRecorder } from "../hooks/useScreenRecorder"; // Import the hook

export const VideoCall = ({ appId, channelName, token, uid }: { appId: string, channelName: string, token: string, uid?: string | number }) => {
    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);

    // Device management
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
    const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(undefined);
    const [selectedMicrophoneId, setSelectedMicrophoneId] = useState<string | undefined>(undefined);
    const [showSettings, setShowSettings] = useState(false);

    // Copy Link state
    const [copied, setCopied] = useState(false);

    // Recording Hook
    const { isRecording, startRecording, stopRecording, recordingError } = useScreenRecorder();

    // Initialize tracks with selected devices (keep tracks active for fast toggling)
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack(true, { microphoneId: selectedMicrophoneId });
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack(true, { cameraId: selectedCameraId });

    // Toggle Mute/Unmute via setEnabled
    useEffect(() => {
        if (localMicrophoneTrack) {
            localMicrophoneTrack.setEnabled(micOn).catch(console.error);
        }
    }, [micOn, localMicrophoneTrack]);

    useEffect(() => {
        if (localCameraTrack) {
            localCameraTrack.setEnabled(cameraOn).catch(console.error);
        }
    }, [cameraOn, localCameraTrack]);

    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    // Play remote audio tracks
    audioTracks.forEach((track) => track.play());

    const { isConnected, isLoading: isJoining, error: joinError } = useJoin(
        {
            appid: appId,
            channel: channelName,
            token: token ? token : null,
            uid: uid || null,
        },
        activeConnection,
    );

    usePublish([localMicrophoneTrack, localCameraTrack]);

    const router = useRouter();

    const handleLeave = () => {
        setActiveConnection(false);
        router.push('/dashboard');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    // Fetch devices on mount
    useEffect(() => {
        AgoraRTC.getDevices().then((devices) => {
            const audioDevices = devices.filter((d) => d.kind === "audioinput");
            const videoDevices = devices.filter((d) => d.kind === "videoinput");
            setMicrophones(audioDevices);
            setCameras(videoDevices);

            if (audioDevices.length > 0 && !selectedMicrophoneId) {
                setSelectedMicrophoneId(audioDevices[0].deviceId);
            }
            if (videoDevices.length > 0 && !selectedCameraId) {
                setSelectedCameraId(videoDevices[0].deviceId);
            }
        });
    }, []);

    // Also update track device if selection changes (though hook might handle recreation, explicit setDevice is often smoother if supported)
    useEffect(() => {
        if (localCameraTrack && selectedCameraId) {
            localCameraTrack.setDevice(selectedCameraId).catch(console.error);
        }
    }, [localCameraTrack, selectedCameraId]);

    useEffect(() => {
        if (localMicrophoneTrack && selectedMicrophoneId) {
            localMicrophoneTrack.setDevice(selectedMicrophoneId).catch(console.error);
        }
    }, [localMicrophoneTrack, selectedMicrophoneId]);


    return (
        <div className="flex flex-col h-full w-full bg-gray-900 rounded-xl overflow-hidden relative">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 relative">
                {/* Status Indicator */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isConnected ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'}`}>
                        {isConnected ? 'Connected' : isJoining ? 'Joining...' : 'Disconnected'}
                    </div>
                    {joinError && (
                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/50">
                            Error: {joinError.message}
                        </div>
                    )}
                    {recordingError && (
                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/50">
                            Rec Error: {recordingError}
                        </div>
                    )}
                </div>

                {/* Local User */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden border-2 border-blue-500/50 aspect-video">
                    <LocalUser
                        audioTrack={localMicrophoneTrack}
                        cameraOn={cameraOn}
                        micOn={micOn}
                        videoTrack={localCameraTrack}
                        cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                    >
                        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
                            You
                        </div>
                    </LocalUser>
                </div>

                {/* Remote Users */}
                {remoteUsers.map((user) => (
                    <div key={user.uid} className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                        <RemoteUser user={user} cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg">
                            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
                                User {user.uid}
                            </div>
                        </RemoteUser>
                    </div>
                ))}

                {/* Device Selection Overlay */}
                {showSettings && (
                    <div className="absolute top-4 right-4 z-10 bg-gray-800/90 backdrop-blur-md p-4 rounded-xl border border-gray-700 w-64 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-medium">Settings</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowSettings(false)}
                                className="h-6 w-6 p-0 hover:bg-gray-700"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase font-semibold">Camera</label>
                                <select
                                    className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedCameraId}
                                    onChange={(e) => setSelectedCameraId(e.target.value)}
                                >
                                    {cameras.map((cam) => (
                                        <option key={cam.deviceId} value={cam.deviceId}>
                                            {cam.label || `Camera ${cameras.indexOf(cam) + 1}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase font-semibold">Microphone</label>
                                <select
                                    className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedMicrophoneId}
                                    onChange={(e) => setSelectedMicrophoneId(e.target.value)}
                                >
                                    {microphones.map((mic) => (
                                        <option key={mic.deviceId} value={mic.deviceId}>
                                            {mic.label || `Microphone ${microphones.indexOf(mic) + 1}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Overlay */}
            <Chat roomId={channelName} senderName="Teacher" />

            {/* Controls */}
            <div className="bg-gray-800/80 backdrop-blur-md p-4 flex justify-center items-center gap-4">
                <Button
                    variant={micOn ? "secondary" : "destructive"}
                    size="icon"
                    onClick={() => setMicOn(!micOn)}
                    className="rounded-full h-12 w-12"
                    title={micOn ? "Mute" : "Unmute"}
                >
                    {micOn ? <Mic /> : <MicOff />}
                </Button>

                <Button
                    variant={cameraOn ? "secondary" : "destructive"}
                    size="icon"
                    onClick={() => setCameraOn(!cameraOn)}
                    className="rounded-full h-12 w-12"
                    title={cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                >
                    {cameraOn ? <Video /> : <VideoOff />}
                </Button>

                {/* Recording Button */}
                <Button
                    variant={isRecording ? "destructive" : "secondary"}
                    size="icon"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`rounded-full h-12 w-12 ${isRecording ? 'animate-pulse' : ''}`}
                    title={isRecording ? "Stop Recording" : "Start Recording"}
                >
                    <div className={`h-4 w-4 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`} />
                </Button>

                <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleLeave}
                    className="rounded-full h-12 w-12"
                    title="Leave Call"
                >
                    <PhoneOff />
                </Button>

                <div className="w-px h-8 bg-gray-600 mx-2"></div>

                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleCopyLink}
                    className="rounded-full h-12 w-12"
                    title="Copy Invite Link"
                >
                    {copied ? <Check className="text-green-500" /> : <Share2 />}
                </Button>

                <Button
                    variant={showSettings ? "default" : "secondary"}
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                    className="rounded-full h-12 w-12"
                    title="Settings"
                >
                    <Settings />
                </Button>
            </div>
        </div>
    );
};
