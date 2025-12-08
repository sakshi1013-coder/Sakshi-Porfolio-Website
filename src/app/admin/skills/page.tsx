'use client';

import { useEffect, useState } from 'react';
import SkillForm from '@/components/SkillForm';
import { ISkill } from '@/types';
import { Trash2 } from 'lucide-react';

export default function SkillsPage() {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/skills');
            const data = await res.json();
            if (data.success) {
                setSkills(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch skills', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setSkills(skills.filter((s) => (s as any)._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete skill', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-midnight tracking-tight">Skills Management</h1>
            <SkillForm onSuccess={fetchSkills} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                    <div key={(skill as any)._id} className="bg-white/60 backdrop-blur-xl border border-white/40 p-4 rounded-3xl shadow-glass flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center">
                            {skill.icon && (
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-10 h-10 mr-4 object-contain bg-white/50 rounded-lg p-1.5 shadow-sm"
                                />
                            )}
                            <div>
                                <h3 className="text-lg font-bold text-midnight">{skill.name}</h3>
                                <p className="text-sm text-midnight/70 font-medium">{skill.category} - {skill.proficiency}%</p>
                            </div>
                            <button
                                onClick={() => handleDelete((skill as any)._id)}
                                className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
