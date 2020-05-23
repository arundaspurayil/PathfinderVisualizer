import React, { useState, useEffect, useRef } from 'react'
import Node from './Node/Node'
import './Visualizer.css'

import dijkstra from '../algorithms/dijkstra'
import bfs from '../algorithms/bfs'
import dfs from '../algorithms/dfs'

import getNodesInShortestPath from '../algorithms/getNodesInShortestPath'

const ROWS = 20
const COLUMNS = 50

const startNodeRow = 10
const startNodeCol = 5
const goalNodeRow = 5
const goalNodeCol = 15

function Visualizer() {
    const [grid, setGrid] = useState([])
    const [algorithm, setAlgorithm] = useState('dijkstra')

    useEffect(() => {
        let nodes = []
        for (let row = 0; row < ROWS; row++) {
            let currentRow = []
            for (let col = 0; col < COLUMNS; col++) {
                currentRow.push(createNode(row, col))
            }
            nodes.push(currentRow)
        }
        setGrid(nodes)
    }, [algorithm])

    function createNode(row, col) {
        return {
            row,
            col,
            isStart: row === startNodeRow && col === startNodeCol,
            isGoal: row === goalNodeRow && col === goalNodeCol,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        }
    }

    function animateShortestPath(nodes, length) {
        let count = 0
        for (let node of nodes) {
            setTimeout(function () {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = 'node node-shortest-path'
            }, 100 * count)
            count += 1
        }
    }

    function animateVisitedNodes(visitedNodes, shortestPathToGoal) {
        const newGrid = [...grid]

        let count = 0
        for (let node of visitedNodes) {
            setTimeout(function () {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className += ' node-visited'
            }, 10 * count)
            if (node.isGoal) {
                setTimeout(function () {
                    animateShortestPath(shortestPathToGoal)
                }, 10 * count)
            }
            count += 1
        }
        setGrid(newGrid)
    }

    function runAlgorithm(event) {
        event.preventDefault()

        const startNode = grid[startNodeRow][startNodeCol]
        const goalNode = grid[goalNodeRow][goalNodeCol]
        let visitedNodes = []
        if (algorithm === 'dijkstra') visitedNodes = dijkstra(grid, startNode)
        if (algorithm === 'bfs') visitedNodes = bfs(grid, startNode)
        if (algorithm === 'dfs') visitedNodes = dfs(grid, startNode)

        const shortestPathToGoal = getNodesInShortestPath(goalNode)

        animateVisitedNodes(visitedNodes, shortestPathToGoal)
    }

    const displayGrid = grid.map((row, rowIdx) => {
        return (
            <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    return <Node key={rowIdx + nodeIdx} properties={node} />
                })}
            </div>
        )
    })
    return (
        <div>
            <form onSubmit={runAlgorithm}>
                <select
                    value={algorithm}
                    onChange={(event) => {
                        setAlgorithm(event.target.value)
                    }}
                >
                    <option value="dijkstra">Dijkstra</option>
                    <option value="bfs">BFS</option>
                    <option value="dfs">DFS</option>
                </select>
                <button type="submit">Visualize!</button>
            </form>

            <div className="grid">{displayGrid}</div>
        </div>
    )
}
export default Visualizer
