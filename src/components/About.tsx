'use client';

import { useEffect, useState } from 'react';
import { ISkill } from '@/types';
import { Code, Server, Wrench, Globe, Database, Terminal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function About() {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const { theme } = useTheme();

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
        'Frontend': { icon: Code },
        'Backend': { icon: Server },
        'Databases': { icon: Database },
        'Programming Languages': { icon: Terminal },
        'Tools': { icon: Wrench },
        'Other': { icon: Globe },
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
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight drop-shadow-md ${theme.text}`}>About & Skills</h2>
                    <p className={`text-lg max-w-2xl mx-auto font-light drop-shadow-sm ${theme.subtext}`}>
                        Here's a glimpse of my technical expertise and the technologies I work with.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.keys(categories).map((category) => {
                        const skillsInCategory = groupedSkills[category] || [];
                        const CatIcon = categories[category as keyof typeof categories].icon;

                        if (skillsInCategory.length === 0) return null;

                        return (
                            <div key={category} className={`backdrop-blur-xl border p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[300px] flex flex-col ${theme.isNight ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white/40 border-white/40 hover:bg-white/50'}`}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner border ${theme.isNight ? 'bg-white/20 border-white/10' : 'bg-white/50 border-white/30'}`}>
                                    <CatIcon className={`h-8 w-8 ${theme.text}`} />
                                </div>
                                <h3 className={`text-2xl font-bold mb-6 tracking-wide ${theme.text}`}>{category}</h3>
                                <div className="space-y-5 flex-grow">
                                    {skillsInCategory.map((skill) => (
                                        <div key={skill._id}>
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
                                                    <span className={`text-lg font-medium transition-colors ${theme.subtext} group-hover:${theme.text}`}>{skill.name}</span>
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
