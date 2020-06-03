import React from 'react'

export default function Sidebar() {
    return (
        <div className="sidebar col-span-2 h-screen bg-gray-900">
            <div className="grid grid-rows-3 gap-6">
                <h1 className="row-span-1 mt-4 text-white text-center font-semibold text-2xl tracking-tight">
                    Pathfinding Visualizer
                </h1>
                <div className="row-span-2 w-full text-white text-center font-semibold text-2xl tracking-tight">
                    <button
                        className="hover:bg-gray-600"
                        type="button"
                        value="Select Algorithm"
                    >
                        Select Algorithm
                    </button>
                </div>
            </div>
        </div>
    )
}
