'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { IProject } from '@/models/Project';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter((p) => (p as any)._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete project', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-midnight tracking-tight">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center px-6 py-3 bg-marigold text-white font-semibold rounded-xl hover:bg-marigold/90 transition-all duration-300 shadow-glass transform hover:-translate-y-0.5"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={(project as any)._id} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-glass overflow-hidden transition-all duration-300 hover:shadow-glass-hover group transform hover:-translate-y-1">
                        {project.imageUrls[0] && (
                            <div className="relative h-48 overflow-hidden">
                                <img src={project.imageUrls[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-midnight mb-2 tracking-wide">{project.title}</h2>
                            <p className="text-midnight/70 mb-6 line-clamp-2 font-light">{project.description}</p>
                            <div className="flex justify-end space-x-3 pt-4 border-t border-midnight/5">
                                <Link
                                    href={`/admin/projects/${(project as any)._id}`}
                                    className="p-2 text-marigold hover:bg-marigold/10 rounded-full transition-colors"
                                >
                                    <Edit className="h-5 w-5" />
                                </Link>
                                <button
                                    onClick={() => handleDelete((project as any)._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
