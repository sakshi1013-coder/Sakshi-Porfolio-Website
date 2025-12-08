'use client';

import { useEffect, useState } from 'react';
import { ISkill, IProfile } from '@/types';
import { Code, Server, Wrench, Globe } from 'lucide-react';

export default function About() {
    const [skills, setSkills] = useState<ISkill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch('/api/skills');
                const data = await res.json();
                if (data.success) {
                    setSkills(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch skills', error);
            }
        };

        fetchSkills();
    }, []);

    const categories = {
        Frontend: { icon: Code, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900' },
        Backend: { icon: Server, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900' },
        Tools: { icon: Wrench, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900' },
        Other: { icon: Globe, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900' },
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category as keyof typeof categories;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, ISkill[]>);

    return (
        <section id="about" className="py-20 bg-transparent transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">About & Skills</h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto font-light drop-shadow-sm">
                        Here's a glimpse of my technical expertise and the technologies I work with.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(groupedSkills).map(([category, skills]) => {
                        const CatIcon = categories[category as keyof typeof categories]?.icon || Globe;

                        return (
                            <div key={category} className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 min-h-[300px] flex flex-col">
                                <div className={`w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8 shadow-inner border border-white/10`}>
                                    <CatIcon className={`h-8 w-8 text-white`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">{category}</h3>
                                <div className="space-y-5 flex-grow">
                                    {skills.map((skill) => (
                                        <div key={(skill as any)._id}>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center">
                                                    {skill.icon && (
                                                        <img
                                                            src={skill.icon}
                                                            alt={skill.name}
                                                            className="w-8 h-8 mr-3 object-contain drop-shadow-sm"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{skill.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
