import React, { useEffect, useState } from 'react';

const RamaLoader = ({ message = "Loading...", percentage = null }) => {
    const [displayPercentage, setDisplayPercentage] = useState(percentage || 0);

    useEffect(() => {
        if (percentage !== null) {
            setDisplayPercentage(Math.min(Math.max(percentage, 0), 100));
        }
    }, [percentage]);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-[50px]">
                <div className="w-[50px] mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280.72 280.48" className="w-full h-auto">
                        {/* Slow rotating white paths */}
                        <g className="animate-[spin_20s_linear_infinite] origin-[140px_140px]">
                            <path fill="white" d="M358.48,185.45A139.71,139.71,0,0,1,430.73,162v56a84,84,0,0,0-39.34,12.77Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M304.69,253.53a140.71,140.71,0,0,1,44.68-61.45l32.91,45.29a84.72,84.72,0,0,0-24.34,33.46Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M301.21,340.22a141.11,141.11,0,0,1,0-76l53.25,17.31a85.17,85.17,0,0,0,0,41.37Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M349.37,412.39a140.71,140.71,0,0,1-44.68-61.45l53.25-17.3a84.61,84.61,0,0,0,24.34,33.45Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M430.73,442.47A139.64,139.64,0,0,1,358.48,419l32.91-45.3a84,84,0,0,0,39.34,12.78Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M514.25,419A139.64,139.64,0,0,1,442,442.47v-56a84,84,0,0,0,39.34-12.78Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M568,350.94a140.71,140.71,0,0,1-44.68,61.45l-32.91-45.3a84.69,84.69,0,0,0,24.33-33.45Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M571.52,264.24a141.37,141.37,0,0,1,0,76l-53.26-17.3a84.85,84.85,0,0,0,0-41.37Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M523.36,192.08A140.71,140.71,0,0,1,568,253.53l-53.26,17.3a84.69,84.69,0,0,0-24.33-33.46Z" transform="translate(-296 -161.99)" />
                            <path fill="white" d="M442,162a139.74,139.74,0,0,1,72.25,23.46l-32.91,45.29A84.06,84.06,0,0,0,442,218Z" transform="translate(-296 -161.99)" />
                        </g>

                        {/* Static text */}
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-white text-[22px] font-bold font-zilap"
                        >
                            RAMESTTA
                        </text>
                    </svg>
                </div>
            </div>

            {/* Message and Percentage */}
            <div className="text-center">
                <p className="text-cyan-300 text-sm font-semibold">{message}</p>
                {percentage !== null && (
                    <div className="mt-3 flex flex-col items-center gap-2">
                        <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden border border-cyan-500/30">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-300"
                                style={{ width: `${displayPercentage}%` }}
                            />
                        </div>
                        <p className="text-xs text-cyan-300/80 font-mono">{displayPercentage}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RamaLoader;
