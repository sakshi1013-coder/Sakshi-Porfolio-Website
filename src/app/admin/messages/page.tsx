'use client';

import { useEffect, useState } from 'react';
import { IMessage } from '@/types';

export default function MessagesPage() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages');
                const data = await res.json();
                if (data.success) {
                    setMessages(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch messages', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-midnight tracking-tight">Messages</h1>
            <div className="space-y-4">
                {messages.length === 0 ? (
                    <p className="text-midnight/60 font-light italic">No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={(msg as any)._id} className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-glass transition-all duration-300 hover:shadow-glass-hover">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-midnight">{msg.name}</h3>
                                    <p className="text-sm text-midnight/70 font-medium">{msg.email}</p>
                                </div>
                                <span className="text-xs text-midnight/50 font-medium bg-white/30 px-2 py-1 rounded-full">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-midnight/80 whitespace-pre-wrap leading-relaxed font-light">{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
