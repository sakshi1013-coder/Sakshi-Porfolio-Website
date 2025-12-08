'use client';

import { useEffect, useState } from 'react';
import { IProfile } from '@/types';
import { Upload } from 'lucide-react';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        avatarUrl: '',
        resumeUrl: '',
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: '',
        },
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                const data = await res.json();
                if (data.success && data.data && Object.keys(data.data).length > 0) {
                    setFormData({
                        ...formData,
                        ...data.data,
                        socialLinks: { ...formData.socialLinks, ...data.data.socialLinks },
                    });
                } else {
                    // Default to the local avatar if no profile exists or avatar is empty
                    setFormData(prev => ({ ...prev, avatarUrl: '/avatar.jpg' }));
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, [socialKey]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage('Profile updated successfully!');
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            setMessage('Error updating profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-midnight tracking-tight">Profile Settings</h1>
            {message && (
                <div className={`p-4 mb-6 rounded-xl border ${message.includes('success') ? 'bg-green-100/50 text-green-800 border-green-200' : 'bg-red-100/50 text-red-800 border-red-200'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8 bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-glass">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-midnight/80 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-midnight/80 mb-2">Title / Designation</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-midnight/80 mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-midnight/80 mb-2">Avatar URL</label>
                    <div className="flex items-center space-x-4">
                        {formData.avatarUrl && (
                            <img src={formData.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                        )}
                        <input
                            type="text"
                            name="avatarUrl"
                            value={formData.avatarUrl}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                            placeholder="/avatar.jpg or https://..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-midnight/80 mb-2">Resume URL</label>
                    <input
                        type="text"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-midnight/80 mb-2">GitHub URL</label>
                        <input
                            type="text"
                            name="social_github"
                            value={formData.socialLinks.github}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-midnight/80 mb-2">LinkedIn URL</label>
                        <input
                            type="text"
                            name="social_linkedin"
                            value={formData.socialLinks.linkedin}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-midnight/80 mb-2">Twitter URL</label>
                        <input
                            type="text"
                            name="social_twitter"
                            value={formData.socialLinks.twitter}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-midnight/80 mb-2">Instagram URL</label>
                        <input
                            type="text"
                            name="social_instagram"
                            value={formData.socialLinks.instagram}
                            onChange={handleChange}
                            className="block w-full rounded-xl border-white/20 bg-white/40 text-midnight placeholder-midnight/30 shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-glass text-sm font-bold text-white bg-marigold hover:bg-marigold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marigold disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
}
