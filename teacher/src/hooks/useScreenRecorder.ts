import { useState, useRef, useCallback } from 'react';

interface UseScreenRecorderReturn {
    isRecording: boolean;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    recordingError: string | null;
}

export const useScreenRecorder = (): UseScreenRecorderReturn => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingError, setRecordingError] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = useCallback(async () => {
        setRecordingError(null);
        try {
            // 1. Get Screen Stream (Video + System Audio)
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true, // IMPORTANT: Request system audio
            });

            // Check if user shared audio
            const systemAudioTrack = displayStream.getAudioTracks()[0];
            if (!systemAudioTrack) {
                // Warn user or handle accordingly. For now, we proceed but maybe without remote audio.
                console.warn("System audio not shared. Remote users might not be heard.");
            }

            // 2. Get Microphone Stream (Local Audio)
            const micStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            // 3. Mix Audio Streams
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = audioContext;

            const dest = audioContext.createMediaStreamDestination();

            if (systemAudioTrack) {
                const systemSource = audioContext.createMediaStreamSource(new MediaStream([systemAudioTrack]));
                systemSource.connect(dest);
            }

            if (micStream.getAudioTracks().length > 0) {
                const micSource = audioContext.createMediaStreamSource(micStream);
                micSource.connect(dest);
            }

            const mixedAudioTracks = dest.stream.getAudioTracks();

            // 4. Combine Video + Mixed Audio
            const combinedStream = new MediaStream([
                ...displayStream.getVideoTracks(),
                ...mixedAudioTracks
            ]);
            streamRef.current = combinedStream;

            // 5. Start Recording
            const mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: 'video/webm; codecs=vp9' // Prefer standard webm
            });
            mediaRecorderRef.current = mediaRecorder;

            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `recording-${new Date().toISOString()}.webm`;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 100);

                // Cleanup tracks
                displayStream.getTracks().forEach(track => track.stop());
                micStream.getTracks().forEach(track => track.stop());
                audioContext.close();
            };

            // Handle case where user stops sharing via browser UI
            displayStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

            mediaRecorder.start();
            setIsRecording(true);

        } catch (err: any) {
            console.error("Error starting recording:", err);
            setRecordingError(err.message || "Failed to start recording");
            setIsRecording(false);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }, []);

    return {
        isRecording,
        startRecording,
        stopRecording,
        recordingError
    };
};
