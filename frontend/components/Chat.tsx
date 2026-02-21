import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare, X } from 'lucide-react';

interface ChatProps {
    roomId: string;
    senderName: string;
}

interface Message {
    roomId: string;
    message: string;
    sender: string;
    timestamp: string;
}

export default function Chat({ roomId, senderName }: ChatProps) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');
        setSocket(newSocket);

        newSocket.emit('joinRoom', roomId);

        newSocket.on('receiveMessage', (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && socket) {
            const msg: Message = {
                roomId,
                message: input,
                sender: senderName,
                timestamp: new Date().toISOString(),
            };
            socket.emit('sendMessage', msg);
            setInput('');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-gray-900 border border-gray-700 w-80 h-96 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4">
                    <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Chat
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.sender === senderName ? 'items-end' : 'items-start'}`}>
                                <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm break-words ${msg.sender === senderName
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-200'
                                    }`}>
                                    <p className="font-bold text-[10px] mb-0.5 opacity-70">{msg.sender}</p>
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={sendMessage} className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow bg-gray-900 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <Button type="submit" size="icon" className="h-9 w-9 bg-blue-600 hover:bg-blue-700">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full h-12 w-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
                >
                    <MessageSquare className="w-6 h-6" />
                </Button>
            )}
        </div>
    );
}
