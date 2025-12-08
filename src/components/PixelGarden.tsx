'use client';

import PixelFlower from './PixelFlower';
import { useGarden } from '@/context/GardenContext';

export default function PixelGarden() {
    const { flowers } = useGarden();

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Evening Sunset Sky Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#827AC4] via-[#BE8ABF] to-[#F8C3AF] z-0">
                {/* Stars */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                {/* Sunset/Moon Glow */}
                <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-marigold/20 rounded-full blur-[80px]"></div>
            </div>

            {/* Distant Hills (Back Garden) */}
            <div className="absolute bottom-32 left-0 right-0 h-64 bg-[#2d4c33] rounded-[50%] scale-150 translate-y-20 opacity-90 z-0"></div>
            <div className="absolute bottom-32 left-0 right-0 h-64 bg-[#1e3a23] rounded-[40%] scale-125 translate-y-32 z-0"></div>

            {/* Grass Blocks (Foreground) - Reduced height and simplified to avoid covering flowers */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1a2f1d] z-0 border-t-4 border-[#142416]">
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
                                    filter: flower.y > 20 ? 'brightness(0.8)' : 'none' // Darken background flowers
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
