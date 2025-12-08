import React from 'react';

export type FlowerType = 'sunflower' | 'rose' | 'tulip' | 'daisy' | 'lavender' | 'orchid';

interface PixelFlowerProps {
    type: FlowerType;
    className?: string;
}

export default function PixelFlower({ type, className = '' }: PixelFlowerProps) {
    const renderFlower = () => {
        switch (type) {
            case 'sunflower':
                return (
                    <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
                        <rect x="7" y="8" width="2" height="8" fill="#4CAF50" /> {/* Stem */}
                        <rect x="6" y="10" width="1" height="3" fill="#388E3C" /> {/* Leaf L */}
                        <rect x="9" y="11" width="1" height="2" fill="#388E3C" /> {/* Leaf R */}
                        <rect x="5" y="3" width="6" height="6" fill="#FFC107" /> {/* Petals */}
                        <rect x="6" y="4" width="4" height="4" fill="#795548" /> {/* Center */}
                    </svg>
                );
            case 'rose':
                return (
                    <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
                        <rect x="7" y="9" width="2" height="7" fill="#4CAF50" /> {/* Stem */}
                        <rect x="6" y="11" width="1" height="2" fill="#388E3C" /> {/* Leaf */}
                        <rect x="5" y="4" width="6" height="5" fill="#E91E63" /> {/* Petals Main */}
                        <rect x="6" y="5" width="4" height="3" fill="#C2185B" /> {/* Inner */}
                    </svg>
                );
            case 'tulip':
                return (
                    <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
                        <rect x="7" y="9" width="2" height="7" fill="#4CAF50" /> {/* Stem */}
                        <rect x="5" y="5" width="6" height="5" fill="#FF5722" /> {/* Petals */}
                        <rect x="5" y="5" width="1" height="2" fill="#E64A19" /> {/* Detail */}
                        <rect x="10" y="5" width="1" height="2" fill="#E64A19" /> {/* Detail */}
                    </svg>
                );
            case 'daisy':
                return (
                    <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
                        <rect x="7" y="9" width="2" height="7" fill="#4CAF50" /> {/* Stem */}
                        <rect x="5" y="5" width="6" height="4" fill="#FFFFFF" /> {/* Petals */}
                        <rect x="7" y="6" width="2" height="2" fill="#FFEB3B" /> {/* Center */}
                    </svg>
                );
            case 'lavender':
                return (
                    <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
                        <rect x="7" y="10" width="2" height="6" fill="#4CAF50" /> {/* Stem */}
                        <rect x="6" y="3" width="4" height="8" fill="#9C27B0" /> {/* Flower Top */}
                        <rect x="7" y="2" width="2" height="2" fill="#7B1FA2" /> {/* Tip */}
                    </svg>
                );
            case 'orchid':
                return (
                    <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
                        <rect x="7" y="10" width="2" height="6" fill="#4CAF50" /> {/* Stem */}
                        <rect x="5" y="4" width="6" height="6" fill="#2196F3" /> {/* Petals */}
                        <rect x="7" y="6" width="2" height="2" fill="#FFFFFF" /> {/* Center */}
                    </svg>
                );
            default:
                return null;
        }
    };

    return renderFlower();
}
