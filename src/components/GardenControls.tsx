'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useGarden, PlantedFlower } from '@/context/GardenContext';
import PixelFlower, { FlowerType } from './PixelFlower';

export default function GardenControls() {
    const { addFlower } = useGarden();
    const [selectedFlower, setSelectedFlower] = useState<FlowerType>('sunflower');
    const [isPlanting, setIsPlanting] = useState(false);

    const flowerTypes: FlowerType[] = ['sunflower', 'rose', 'tulip', 'daisy', 'lavender', 'orchid'];

    const handlePlant = () => {
        // Randomize depth for planting to allow "back garden" planting
        const isBackground = Math.random() > 0.6;
        const yPos = isBackground
            ? Math.random() * 25 + 25 // Background
            : Math.random() * 15 + 5; // Foreground

        const newFlower: PlantedFlower = {
            id: Date.now(),
            type: selectedFlower,
            x: Math.random() * 90 + 5,
            y: yPos,
            scale: isBackground ? Math.random() * 0.3 + 0.4 : Math.random() * 0.3 + 0.8
        };
        addFlower(newFlower);
        setIsPlanting(false);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            {isPlanting ? (
                <div className="bg-black/40 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/10 flex gap-3 animate-in slide-in-from-bottom-2">
                    {flowerTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedFlower(type)}
                            className={`p-2 rounded-xl transition-all duration-200 ${selectedFlower === type ? 'bg-white/20 ring-1 ring-white/50 scale-110 shadow-lg' : 'hover:bg-white/10 opacity-70 hover:opacity-100'}`}
                        >
                            <div className="w-8 h-8">
                                <PixelFlower type={type} />
                            </div>
                        </button>
                    ))}
                    <button
                        onClick={handlePlant}
                        className="px-5 py-1 bg-marigold text-white font-bold font-pixel text-xs rounded-xl hover:bg-marigold/90 ml-2 shadow-lg hover:scale-105 transition-transform flex items-center"
                    >
                        PLANT
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsPlanting(true)}
                    className="group flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-md text-white font-bold font-pixel text-xs rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:bg-black/50 hover:border-white/30"
                >
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:rotate-90 transition-transform duration-300">
                        <Plus className="w-4 h-4" />
                    </div>
                    <span className="tracking-wide">Plant a Flower</span>
                </button>
            )}
        </div>
    );
}
