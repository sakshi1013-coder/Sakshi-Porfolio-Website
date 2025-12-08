'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { IProfile } from '@/types';

export default function Footer() {
    const [profile, setProfile] = useState<IProfile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                const data = await res.json();
                if (data.success) {
                    setProfile(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <footer className="bg-transparent backdrop-blur-sm border-t border-white/10 py-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-white/60 text-sm mb-4 md:mb-0">
                    © {new Date().getFullYear()} {profile?.name || 'Sakshi Shingole'}. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    {profile?.socialLinks?.github && (
                        <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                    )}
                    {profile?.socialLinks?.linkedin && (
                        <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    )}
                    {profile?.socialLinks?.twitter && (
                        <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                    )}
                    {profile?.socialLinks?.instagram && (
                        <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                    )}
                </div>
            </div>
        </footer>
    );
}
