'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProject } from '@/types';

interface ProjectFormProps {
    initialData?: Partial<IProject>;
    isEditing?: boolean;
}

export default function ProjectForm({ initialData = {}, isEditing = false }: ProjectFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        tags: initialData.tags?.join(', ') || '',
        imageUrls: initialData.imageUrls?.join(', ') || '',
        liveLink: initialData.liveLink || '',
        githubLink: initialData.githubLink || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
            imageUrls: formData.imageUrls.split(',').map((url) => url.trim()).filter(Boolean),
        };

        try {
            const url = isEditing ? `/api/projects/${(initialData as any)._id}` : '/api/projects';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save project');

            router.push('/admin/projects');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-midnight text-lionsmane p-8 rounded-3xl shadow-glass border border-white/10 transition-all duration-300">
            {error && <p className="text-red-400 bg-red-900/20 p-3 rounded-xl border border-red-500/30">{error}</p>}

            <div>
                <label className="block text-sm font-bold mb-2 opacity-80">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-2 opacity-80">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-2 opacity-80">Tags (comma separated)</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-2 opacity-80">Image URLs (comma separated)</label>
                <input
                    type="text"
                    name="imageUrls"
                    value={formData.imageUrls}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold mb-2 opacity-80">Live Link</label>
                    <input
                        type="url"
                        name="liveLink"
                        value={formData.liveLink}
                        onChange={handleChange}
                        className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 opacity-80">GitHub Link</label>
                    <input
                        type="url"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleChange}
                        className="block w-full rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-glass text-sm font-bold text-white bg-marigold hover:bg-marigold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marigold disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
                {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
            </button>
        </form>
    );
}
