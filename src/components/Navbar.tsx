'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? `${theme.navbarBg} backdrop-blur-xl shadow-glass border-b border-white/10` : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? (theme.isNight ? 'text-white' : 'text-midnight') : theme.text}`}>
                            Portfolio
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 hover:bg-white/10 ${scrolled ? (theme.isNight ? 'text-white/80 hover:text-white' : 'text-midnight/80 hover:text-marigold') : `${theme.subtext} hover:${theme.highlight}`}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-colors ${scrolled ? (theme.isNight ? 'text-white hover:text-white hover:bg-white/10' : 'text-midnight hover:text-marigold hover:bg-white/40') : `${theme.text} hover:${theme.highlight} hover:bg-white/10`}`}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className={`md:hidden backdrop-blur-2xl shadow-glass border-t ${theme.navbarBg.replace('/80', '/95').replace('/90', '/95')} border-white/10`}>
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${theme.isNight ? 'text-white hover:text-white hover:bg-white/10' : 'text-midnight hover:text-marigold hover:bg-white/40'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
