'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { IProfile } from '@/models/Profile';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GardenControls from './GardenControls';

export default function Hero() {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const heroRef = useRef(null);
    const textRef = useRef(null);

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
        if (profile) {
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
        <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 transition-colors duration-500 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">
                <div ref={textRef} className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
                        Hi, I'm <span className="text-celeste relative inline-block">
                            {profile.name}
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-marigold/20 -z-10 rounded-full blur-sm transform -rotate-1"></span>
                        </span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-6 drop-shadow-sm">
                        {profile.title}
                    </h2>
                    <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed font-light drop-shadow-sm">
                        {profile.bio}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <Link
                            href="#projects"
                            className="px-8 py-4 border-2 border-lionsmane/20 text-lionsmane rounded-full font-medium hover:bg-lionsmane/10 transition-all duration-300 backdrop-blur-sm bg-midnight/30 flex items-center"
                        >
                            View Work <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-4 border-2 border-lionsmane/20 text-lionsmane rounded-full font-medium hover:bg-lionsmane/10 transition-all duration-300 backdrop-blur-sm bg-midnight/30"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-[8px] border-white/10 shadow-2xl shadow-black/20">
                        <div className="absolute inset-0 bg-gradient-to-tr from-midnight/40 to-transparent mix-blend-overlay z-10"></div>
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
