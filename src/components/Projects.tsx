'use client';

import { useEffect, useState } from 'react';
import { IProject } from '@/models/Project';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                if (data.success) {
                    setProjects(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch projects', error);
            }
        };

        fetchProjects();
    }, []);

    const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
    const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter));

    return (
        <section id="projects" className="py-20 bg-transparent transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">Featured Projects</h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto font-light drop-shadow-sm">
                        A collection of projects I've worked on.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ${filter === tag
                                ? 'bg-lionsmane text-midnight border-lionsmane shadow-lg scale-105'
                                : 'border-lionsmane/20 text-lionsmane hover:bg-lionsmane/10 backdrop-blur-sm bg-midnight/30'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={(project as any)._id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:bg-white/15 transition-all duration-300 group transform hover:-translate-y-1">
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={project.imageUrls[0] || 'https://via.placeholder.com/600x400'}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{project.title}</h3>
                                <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed font-light">{project.description}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-white/90 hover:text-marigold transition-colors group/link"
                                        >
                                            <Github className="h-5 w-5 mr-2 group-hover/link:scale-110 transition-transform" />
                                            Code
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-white font-medium hover:text-marigold transition-colors group/link"
                                        >
                                            Live Demo
                                            <ExternalLink className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
