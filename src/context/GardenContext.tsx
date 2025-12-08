'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FlowerType } from '@/components/PixelFlower';

export interface PlantedFlower {
    id: number;
    type: FlowerType;
    x: number; // Percentage horizontal
    y: number; // Percentage vertical (depth)
    scale: number;
}

interface GardenContextType {
    flowers: PlantedFlower[];
    addFlower: (flower: PlantedFlower) => void;
    resetGarden: () => void;
    flowerCounts: Record<FlowerType, number>;
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

export function GardenProvider({ children }: { children: ReactNode }) {
    const [flowers, setFlowers] = useState<PlantedFlower[]>([]);

    // Load initial flowers (simulated visitor count)
    useEffect(() => {
        // Try to load from local storage first
        const savedFlowers = localStorage.getItem('pixel-garden-flowers');
        if (savedFlowers) {
            setFlowers(JSON.parse(savedFlowers));
        } else {
            const initialFlowers: PlantedFlower[] = [];
            // Foreground flowers
            for (let i = 0; i < 6; i++) {
                initialFlowers.push({
                    id: i,
                    type: ['sunflower', 'rose', 'tulip', 'daisy', 'lavender', 'orchid'][Math.floor(Math.random() * 6)] as FlowerType,
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 15 + 5, // 5-20% (Foreground)
                    scale: Math.random() * 0.3 + 0.8
                });
            }
            // Background flowers (Hills)
            for (let i = 6; i < 15; i++) {
                initialFlowers.push({
                    id: i,
                    type: ['sunflower', 'rose', 'tulip', 'daisy', 'lavender', 'orchid'][Math.floor(Math.random() * 6)] as FlowerType,
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 25 + 25, // 25-50% (Background)
                    scale: Math.random() * 0.3 + 0.4 // Smaller for distance
                });
            }
            setFlowers(initialFlowers);
        }
    }, []);

    // Save to local storage whenever flowers change
    useEffect(() => {
        if (flowers.length > 0) {
            localStorage.setItem('pixel-garden-flowers', JSON.stringify(flowers));
        }
    }, [flowers]);

    // Listen for storage changes (cross-tab sync)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'pixel-garden-flowers') {
                if (e.newValue) {
                    setFlowers(JSON.parse(e.newValue));
                } else {
                    // If key was removed (reset), clear flowers
                    setFlowers([]);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addFlower = (flower: PlantedFlower) => {
        setFlowers(prev => [...prev, flower]);
    };

    const resetGarden = () => {
        setFlowers([]);
        localStorage.removeItem('pixel-garden-flowers');
    };

    const flowerCounts = flowers.reduce((acc, flower) => {
        acc[flower.type] = (acc[flower.type] || 0) + 1;
        return acc;
    }, {} as Record<FlowerType, number>);

    return (
        <GardenContext.Provider value={{ flowers, addFlower, resetGarden, flowerCounts }}>
            {children}
        </GardenContext.Provider>
    );
}

export function useGarden() {
    const context = useContext(GardenContext);
    if (context === undefined) {
        throw new Error('useGarden must be used within a GardenProvider');
    }
    return context;
}
