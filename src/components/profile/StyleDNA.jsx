import React from 'react';
import { motion } from 'framer-motion';

const StyleDNA = () => {
    // Mock data for the Radar Chart
    const categories = [
        { name: 'Minimalist', value: 85 },
        { name: 'Streetwear', value: 45 },
        { name: 'Luxury', value: 95 },
        { name: 'Atheleisure', value: 30 },
        { name: 'Vintage', value: 60 },
    ];

    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;
    const angleStep = (Math.PI * 2) / categories.length;

    // Calculate coordinates for the axes and the data points
    const points = categories.map((cat, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + radius * (cat.value / 100) * Math.cos(angle);
        const y = center + radius * (cat.value / 100) * Math.sin(angle);
        return { x, y, label: cat.name };
    });

    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    return (
        <div className="flex flex-col items-center justify-center space-y-8 p-4 md:p-6 w-full max-w-sm mx-auto">
            <div className="relative w-full aspect-square max-w-[300px]">
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    className="w-full h-full overflow-visible"
                >
                    {/* Background Circles */}
                    {[0.2, 0.4, 0.6, 0.8, 1].map((step) => (
                        <circle
                            key={step}
                            cx={center}
                            cy={center}
                            r={radius * step}
                            fill="none"
                            stroke="currentColor"
                            className="text-navy-900/5"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axes */}
                    {categories.map((_, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const x = center + radius * Math.cos(angle);
                        const y = center + radius * Math.sin(angle);
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke="currentColor"
                                className="text-navy-900/5"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Labels */}
                    {categories.map((cat, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const x = center + (radius + 25) * Math.cos(angle);
                        const y = center + (radius + 25) * Math.sin(angle);
                        return (
                            <text
                                key={i}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-navy-900/40 text-[9px] font-black uppercase tracking-widest font-jakarta"
                            >
                                {cat.name}
                            </text>
                        );
                    })}

                    {/* Data Path */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d={pathData}
                        fill="rgba(11, 31, 63, 0.05)"
                        stroke="#0B1F3F"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    {points.map((p, i) => (
                        <motion.circle
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            cx={p.x}
                            cy={p.y}
                            r="4"
                            className="fill-navy-900 shadow-xl"
                        />
                    ))}
                </svg>

                {/* Floating Stat Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="text-[10px] font-black text-navy-900/10 uppercase tracking-[0.5em] block">Style DNA</span>
                    <span className="text-3xl font-instrument italic text-navy-900">Elite</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {categories.slice(0, 4).map((cat, i) => (
                    <div key={i} className="bg-white border border-navy-900/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1">
                        <span className="text-[8px] font-black text-navy-900/30 uppercase tracking-widest">{cat.name}</span>
                        <span className="text-sm font-outfit font-bold text-navy-900">{cat.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StyleDNA;
