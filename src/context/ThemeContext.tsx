'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeType {
    bg: string;
    text: string;
    subtext: string;
    highlight: string;
    navbarBg: string;
    isNight: boolean;
}

interface ThemeContextType {
    theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>({
        bg: 'bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#2F80E4]', // Default Blue
        text: 'text-white',
        subtext: 'text-white/90',
        highlight: 'text-celeste',
        navbarBg: 'bg-[#1e3c72]/80',
        isNight: false,
    });

    useEffect(() => {
        const updateTheme = () => {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const ist = new Date(utc + (3600000 * 5.5));
            const hour = ist.getHours();

            let newTheme;

            // Morning: 5 AM - 12 PM
            if (hour >= 5 && hour < 12) {
                newTheme = {
                    bg: 'bg-gradient-to-br from-blue-300 via-blue-100 to-yellow-100', // Soft Morning Sky
                    text: 'text-midnight',
                    subtext: 'text-midnight/80',
                    highlight: 'text-marigold',
                    navbarBg: 'bg-blue-300/80',
                    isNight: false,
                };
            }
            // Afternoon: 12 PM - 5 PM
            else if (hour >= 12 && hour < 17) {
                newTheme = {
                    bg: 'bg-gradient-to-br from-cyan-400 via-blue-400 to-blue-600', // Bright Afternoon
                    text: 'text-white', // Contrast against blue
                    subtext: 'text-white/90',
                    highlight: 'text-yellow-300',
                    navbarBg: 'bg-blue-500/80',
                    isNight: false,
                };
            }
            // Evening: 5 PM - 8 PM
            else if (hour >= 17 && hour < 20) {
                newTheme = {
                    bg: 'bg-gradient-to-br from-orange-400 via-red-400 to-purple-600', // Sunset
                    text: 'text-white',
                    subtext: 'text-white/90',
                    highlight: 'text-indigo-200',
                    navbarBg: 'bg-purple-700/80',
                    isNight: false,
                };
            }
            // Night: 8 PM - 5 AM
            else {
                newTheme = {
                    // Dark Blue Gradient: Very Dark Blue -> Royal Blue -> Deep Indigo
                    bg: 'bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]',
                    text: 'text-white',
                    subtext: 'text-white/80',
                    highlight: 'text-celeste',
                    navbarBg: 'bg-[#020617]/90', // Matches top of gradient
                    isNight: true,
                };
            }
            setTheme(newTheme);
        };

        updateTheme();
        const interval = setInterval(updateTheme, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
