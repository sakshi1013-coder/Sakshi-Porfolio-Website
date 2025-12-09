'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FlowerType } from '@/components/PixelFlower';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, writeBatch, getDocs, Timestamp } from 'firebase/firestore';

export interface PlantedFlower {
    id: string;
    type: FlowerType;
    x: number; // Percentage horizontal
    y: number; // Percentage vertical (depth)
    scale: number;
    createdAt?: Timestamp;
}

interface GardenContextType {
    flowers: PlantedFlower[];
    addFlower: (flower: Omit<PlantedFlower, 'id'>) => Promise<void>;
    resetGarden: () => Promise<void>;
    flowerCounts: Record<FlowerType, number>;
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

export function GardenProvider({ children }: { children: ReactNode }) {
    const [flowers, setFlowers] = useState<PlantedFlower[]>([]);

    // Real-time listener for flowers
    useEffect(() => {
        const q = query(collection(db, 'flowers'), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newFlowers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as PlantedFlower[];
            setFlowers(newFlowers);
        }, (error) => {
            console.error("Error fetching flowers:", error);
        });

        return () => unsubscribe();
    }, []);

    const addFlower = async (flower: Omit<PlantedFlower, 'id'>) => {
        try {
            await addDoc(collection(db, 'flowers'), {
                ...flower,
                createdAt: Timestamp.now()
            });
        } catch (error) {
            console.error("Error planting flower:", error);
        }
    };

    const resetGarden = async () => {
        try {
            const batch = writeBatch(db);
            const snapshot = await getDocs(collection(db, 'flowers'));

            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
        } catch (error) {
            console.error("Error resetting garden:", error);
        }
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
