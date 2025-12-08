'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Wrench, MessageSquare, Flower } from 'lucide-react';
import { useGarden } from '@/context/GardenContext';
import PixelFlower from '@/components/PixelFlower';

export default function AdminDashboard() {
    const { flowers, flowerCounts, resetGarden } = useGarden();
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        messages: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, skillsRes, messagesRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/skills'),
                    fetch('/api/messages'),
                ]);

                const projects = await projectsRes.json();
                const skills = await skillsRes.json();
                const messages = await messagesRes.json();

                setStats({
                    projects: projects.data?.length || 0,
                    skills: skills.data?.length || 0,
                    messages: messages.data?.length || 0,
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-midnight tracking-tight drop-shadow-sm">Dashboard Overview</h1>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-glass flex items-center transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 rounded-full bg-marigold/20 text-marigold mr-4 border border-marigold/30">
                        <FolderKanban className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm text-midnight/70 font-medium">Total Projects</p>
                        <p className="text-2xl font-bold text-midnight">{stats.projects}</p>
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-glass flex items-center transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 rounded-full bg-green-400/20 text-green-600 mr-4 border border-green-400/30">
                        <Wrench className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm text-midnight/70 font-medium">Total Skills</p>
                        <p className="text-2xl font-bold text-midnight">{stats.skills}</p>
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-glass flex items-center transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 rounded-full bg-blue-400/20 text-blue-600 mr-4 border border-blue-400/30">
                        <MessageSquare className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm text-midnight/70 font-medium">Unread Messages</p>
                        <p className="text-2xl font-bold text-midnight">{stats.messages}</p>
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-glass flex items-center transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 rounded-full bg-pink-400/20 text-pink-600 mr-4 border border-pink-400/30">
                        <Flower className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm text-midnight/70 font-medium">Planted Flowers</p>
                        <p className="text-2xl font-bold text-midnight">{flowers.length}</p>
                    </div>
                </div>
            </div>

            {/* Garden Stats Breakdown */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-glass">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-midnight">Garden Composition</h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to reset the garden? This will remove all planted flowers.')) {
                                    if (window.confirm('Really? This cannot be undone!')) {
                                        resetGarden();
                                    }
                                }
                            }}
                            className="px-4 py-2 bg-red-500/10 text-red-600 rounded-full text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20"
                        >
                            Reset Garden
                        </button>
                        <div className="bg-white/40 px-4 py-2 rounded-full border border-white/20">
                            <span className="text-midnight/70 text-sm mr-2">Total Flowers:</span>
                            <span className="text-midnight font-bold">{flowers.length}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(flowerCounts).map(([type, count]) => (
                        <div key={type} className="bg-white/40 border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/60 transition-colors">
                            <div className="w-12 h-12 mb-3">
                                <PixelFlower type={type as any} />
                            </div>
                            <span className="text-midnight font-medium capitalize mb-1">{type}</span>
                            <span className="text-midnight/60 text-sm">{count} planted</span>
                        </div>
                    ))}
                    {Object.keys(flowerCounts).length === 0 && (
                        <div className="col-span-full text-center text-midnight/50 py-4">
                            No flowers planted yet. Go plant some!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
