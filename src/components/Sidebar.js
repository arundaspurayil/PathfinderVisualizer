import React, { useState } from 'react'
import '../styles/Sidebar.css'
import { SlideDown } from 'react-slidedown'
import dropdownSVG from '../drop-down-arrow.svg'

import 'react-slidedown/lib/slidedown.css'
export default function Sidebar(props) {
    const [showAlgorithms, setShowAlgorithms] = useState(false)
    const { setAlgorithm, runAlgorithm, clearGrid, createMaze } = props
    function handleSelectDropDown(event) {
        event.preventDefault()
        setShowAlgorithms(!showAlgorithms)
    }
    function handleSelectAlgorithm(event) {
        event.preventDefault()
        setAlgorithm(event.target.value)
        setShowAlgorithms(false)
    }
    const algorithms = showAlgorithms ? (
        <div className="bg-gray-200 text-black ">
            <div>
                <button
                    type="button"
                    value="dijkstra"
                    onClick={handleSelectAlgorithm}
                >
                    Dijkstra
                </button>
            </div>
            <div>
                <button
                    type="button"
                    value="astar"
                    onClick={handleSelectAlgorithm}
                >
                    A*
                </button>
            </div>
            <div>
                <button
                    type="button"
                    value="gbfs"
                    onClick={handleSelectAlgorithm}
                >
                    Greedy Best First Search
                </button>
            </div>
            <div>
                <button
                    type="button"
                    value="bfs"
                    onClick={handleSelectAlgorithm}
                >
                    Breath First Search
                </button>
            </div>
            <div>
                <button
                    type="button"
                    value="dfs"
                    onClick={handleSelectAlgorithm}
                >
                    Depth First Search
                </button>
            </div>
        </div>
    ) : null
    function handleClick(event) {
        event.preventDefault()
        const button = event.target.value
        if (button === 'visualize') runAlgorithm()
        else if (button === 'clear') clearGrid()
        else if (button === 'maze') createMaze()
    }
    return (
        <div className="sidebar col-span-2 h-screen bg-gray-900">
            <div className="grid grid-rows-12 gap-6">
                <h1 className="row-span-1 mt-4 text-white text-center font-semibold text-2xl tracking-tight">
                    Pathfinding Visualizer
                </h1>
                <div className="row-span-1 text-white text-center font-semibold text-2xl tracking-tight ">
                    <button
                        className="hover:bg-gray-600 w-full"
                        type="button"
                        onClick={handleSelectDropDown}
                    >
                        Select Algorithm
                        <img
                            className="dropdownSVG"
                            src={dropdownSVG}
                            alt="dropdown"
                        ></img>
                    </button>
                    <SlideDown>{algorithms}</SlideDown>
                </div>
                <div className="row-span-1 text-center ">
                    <button
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        value="maze"
                        onClick={handleClick}
                    >
                        Generate Maze
                    </button>
                </div>
                <div className="row-span-1 text-center ">
                    <button
                        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        value="visualize"
                        onClick={handleClick}
                    >
                        Visualize!
                    </button>
                </div>
                <div className="row-span-1 text-center ">
                    <button
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        value="clear"
                        onClick={handleClick}
                    >
                        Clear Grid
                    </button>
                </div>
            </div>
        </div>
    )
}
