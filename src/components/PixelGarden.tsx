'use client';

import { useEffect, useState } from 'react';
import PixelFlower from './PixelFlower';
import { useGarden } from '@/context/GardenContext';
import { useTheme } from '@/context/ThemeContext';

export default function PixelGarden() {
    const { flowers } = useGarden();
    const { theme } = useTheme();
    const [stars, setStars] = useState<Array<{ top: string, left: string, delay: string, size: number }>>([]);

    useEffect(() => {
        if (theme.isNight) {
            const newStars = Array.from({ length: 100 }).map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 5}s`,
                size: Math.random() * 2 + 1, // 1px to 3px
            }));
            setStars(newStars);
        } else {
            setStars([]);
        }
    }, [theme.isNight]);

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-colors duration-1000 ${theme.bg}`}>

            {/* Stars - Only Visible at Night */}
            {theme.isNight && (
                <div className="absolute inset-0 z-0">
                    {stars.map((star, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full animate-pulse opacity-80 shadow-sm"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                animationDuration: `${Math.random() * 3 + 2}s`,
                                animationDelay: star.delay,
                            }}
                        />
                    ))}
                    {/* Moon Glow for Night */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-[60px]"></div>
                </div>
            )}

            {/* Day/Sunset Glow - Only Visible during Day */}
            {!theme.isNight && (
                <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-marigold/20 rounded-full blur-[80px]"></div>
            )}

            {/* Distant Hills (Back Garden) - Darker at Night */}
            <div className={`absolute bottom-32 left-0 right-0 h-64 rounded-[50%] scale-150 translate-y-20 opacity-90 z-0 transition-colors duration-1000 ${theme.isNight ? 'bg-[#1a2f1d]' : 'bg-[#2d4c33]'}`}></div>
            <div className={`absolute bottom-32 left-0 right-0 h-64 rounded-[40%] scale-125 translate-y-32 z-0 transition-colors duration-1000 ${theme.isNight ? 'bg-[#0f1f12]' : 'bg-[#1e3a23]'}`}></div>

            {/* Grass Blocks (Foreground) - Darker at Night */}
            <div className={`absolute bottom-0 left-0 right-0 h-16 z-0 border-t-4 transition-colors duration-1000 ${theme.isNight ? 'bg-[#0a140c] border-[#050a06]' : 'bg-[#1a2f1d] border-[#142416]'}`}>
                {/* Simple texture */}
                <div className="w-full h-full opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                        backgroundSize: '10px 10px'
                    }}>
                </div>
            </div>

            {/* Flowers Layer - Covers both foreground and background */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] z-0 px-4 pointer-events-none">
                {flowers.map((flower) => (
                    <div
                        key={flower.id}
                        className="absolute pointer-events-auto"
                        style={{
                            left: `${flower.x}%`,
                            bottom: `${flower.y}%`,
                            width: '48px',
                            height: '48px',
                            zIndex: flower.y < 20 ? 20 : 5, // Foreground flowers above grass (z-10), background below
                        }}
                    >
                        <div className="animate-bloom origin-bottom w-full h-full">
                            <div
                                className="w-full h-full origin-bottom"
                                style={{
                                    transform: `scale(${flower.scale})`,
                                    filter: flower.y > 20 || theme.isNight ? 'brightness(0.7)' : 'none' // Darken background flowers and all flowers at night
                                }}
                            >
                                <div className="w-full h-full transition-transform duration-300 hover:scale-125 cursor-pointer origin-bottom">
                                    <PixelFlower type={flower.type} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
