import React, { useState } from 'react'
import '../styles/Sidebar.css'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
export default function Sidebar() {
    const [showAlgorithms, setShowAlgorithms] = useState(false)
    function handleSelectAlgorithm(event) {
        event.preventDefault()
        setShowAlgorithms(!showAlgorithms)
        console.log('hello')
    } /*
        <button value="dijkstra">Dijkstra</option>+
                <option value="astar">A*</option>
                <option value="gbfs">Greedy Best First Search</option>
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
    */
    const algorithms = showAlgorithms ? (
        <div className="bg-gray-200 text-black ">
            <div>
                <button
                    className=""
                    type="button"
                    onClick={handleSelectAlgorithm}
                >
                    Dijkstra
                </button>
            </div>
            <div>
                <button
                    className=""
                    type="button"
                    onClick={handleSelectAlgorithm}
                >
                    A*
                </button>
            </div>
        </div>
    ) : null

    return (
        <div className="sidebar col-span-2 h-screen bg-gray-900">
            <div className="grid grid-rows-12 gap-6">
                <h1 className="row-span-1 mt-4 text-white text-center font-semibold text-2xl tracking-tight">
                    Pathfinding Visualizer
                </h1>
                <div className="row-span-1  text-white text-center font-semibold text-2xl tracking-tight ">
                    <button
                        className="hover:bg-gray-600 w-full"
                        type="button"
                        onClick={handleSelectAlgorithm}
                    >
                        Select Algorithm
                    </button>
                    <SlideDown className={'my-dropdown-slidedown'}>
                        {algorithms}
                    </SlideDown>
                </div>
            </div>
        </div>
    )
}
