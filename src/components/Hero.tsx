'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { IProfile } from '@/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GardenControls from './GardenControls';
import { useTheme } from '@/context/ThemeContext';

export default function Hero() {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const { theme } = useTheme();

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

    useEffect(() => {
        if (profile && textRef.current) {
            const ctx = gsap.context(() => {
                gsap.from(textRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                });
            }, heroRef);

            return () => ctx.revert();
        }
    }, [profile]);

    if (!profile) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 transition-colors duration-1000 relative overflow-hidden bg-transparent">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">
                <div ref={textRef} className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight drop-shadow-md ${theme.text}`}>
                        Hi, I'm <span className={`${theme.highlight} relative inline-block`}>
                            {profile.name}
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-white/10 -z-10 rounded-full blur-sm transform -rotate-1"></span>
                        </span>
                    </h1>
                    <h2 className={`text-2xl md:text-3xl font-medium mb-6 drop-shadow-sm ${theme.subtext}`}>
                        {profile.title}
                    </h2>
                    <p className={`text-lg mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed font-light drop-shadow-sm ${theme.subtext}`}>
                        {profile.bio}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <Link
                            href="#projects"
                            className={`px-8 py-4 border-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm flex items-center ${theme.isNight
                                ? 'border-white/20 text-white hover:bg-white/10'
                                : 'border-midnight/20 text-midnight hover:bg-midnight/10'
                                }`}
                        >
                            View Work <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="#contact"
                            className={`px-8 py-4 border-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${theme.isNight
                                ? 'border-white/20 text-white hover:bg-white/10'
                                : 'border-midnight/20 text-midnight hover:bg-midnight/10'
                                }`}
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-[8px] border-white/20 shadow-2xl shadow-black/20">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent mix-blend-overlay z-10"></div>
                        <img
                            src={profile.avatarUrl || '/avatar.jpg'}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Garden Controls - Scrolls with Hero */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
                <GardenControls />
            </div>
        </section>
    );
}
