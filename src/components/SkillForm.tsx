'use client';

import { useState } from 'react';
import { ISkill } from '@/types';

interface SkillFormProps {
    onSuccess: () => void;
}

export default function SkillForm({ onSuccess }: SkillFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Frontend',
        proficiency: 100,
        icon: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: '', category: 'Frontend', proficiency: 100, icon: '' });
                onSuccess();
            }
        } catch (error) {
            console.error('Failed to add skill', error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="bg-midnight text-lionsmane p-8 rounded-3xl shadow-glass mb-10 border border-white/10 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 tracking-wide">Add New Skill</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold mb-2 opacity-80">Skill Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 opacity-80">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm [&>option]:bg-midnight [&>option]:text-lionsmane"
                    >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Databases">Databases</option>
                        <option value="Programming Languages">Programming Languages</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 opacity-80">SVG Icon URL</label>
                    <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-glass text-sm font-bold text-white bg-marigold hover:bg-marigold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marigold disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
                {loading ? 'Adding...' : 'Add Skill'}
            </button>
        </form>
    );
}
