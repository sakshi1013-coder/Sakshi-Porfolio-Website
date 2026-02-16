'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProject } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import { X, Plus } from 'lucide-react';

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
        imageUrls: initialData.imageUrls || [] as string[],
        liveLink: initialData.liveLink || '',
        githubLink: initialData.githubLink || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadKey, setUploadKey] = useState(0);
    const [manualUrl, setManualUrl] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddManualUrl = () => {
        if (manualUrl.trim()) {
            setFormData({ ...formData, imageUrls: [...formData.imageUrls, manualUrl.trim()] });
            setManualUrl('');
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...formData.imageUrls];
        newImages.splice(index, 1);
        setFormData({ ...formData, imageUrls: newImages });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
            // imageUrls is already an array
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
                <label className="block text-sm font-bold mb-2 opacity-80">Project Images</label>

                {/* Image List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {formData.imageUrls.map((url, index) => (
                        <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20">
                            <img src={url} alt={`Project ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm backdrop-blur-sm"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {formData.imageUrls.length === 0 && (
                        <div className="col-span-full py-8 text-center text-lionsmane/40 border border-dashed border-white/10 rounded-xl">
                            No images added yet.
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <p className="text-xs text-lionsmane/70 mb-2 font-bold uppercase tracking-wider">Upload New Image</p>
                        <ImageUpload
                            key={uploadKey}
                            folder="projects"
                            label=" "
                            onUploadComplete={(url) => {
                                setFormData({ ...formData, imageUrls: [...formData.imageUrls, url] });
                                setUploadKey(prev => prev + 1);
                            }}
                        />
                    </div>

                    <div className="flex-1 w-full pt-6 md:pt-0">
                        <p className="text-xs text-lionsmane/70 mb-2 font-bold uppercase tracking-wider">Or Add URL Manually</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={manualUrl}
                                onChange={(e) => setManualUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 rounded-xl border-white/10 bg-white/10 text-lionsmane placeholder-lionsmane/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleAddManualUrl}
                                disabled={!manualUrl.trim()}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all disabled:opacity-50"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                </div>
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
