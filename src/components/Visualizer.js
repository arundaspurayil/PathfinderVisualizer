import React, { useState, useEffect } from 'react'
import Node from './Node/Node'
import './Visualizer.css'

import { dijkstra, getNodesInShortestPath } from '../algorithms/dijkstra'

const ROWS = 20
const COLUMNS = 50

const startNodeRow = 3
const startNodeCol = 10
const goalNodeRow = 9
const goalNodeCol = 30

function Visualizer() {
    const [grid, setGrid] = useState([])

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
    }, [])

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

    function handleClick(event) {
        event.preventDefault()
        const startNode = grid[startNodeRow][startNodeCol]
        const goalNode = grid[goalNodeRow][goalNodeCol]
        const visitedNodes = dijkstra(grid, startNode, goalNode)
        animateDijkstra(visitedNodes)
        const shortestPathToGoal = getNodesInShortestPath(goalNode)
        animateShortestPath(shortestPathToGoal)
    }
    function animateShortestPath(nodes) {
        for (let node of nodes) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path'
        }
    }

    function animateDijkstra(visitedNodes) {
        const newGrid = [...grid]
        for (let node of visitedNodes) {
            document.getElementById(`node-${node.row}-${node.col}`).className +=
                ' node-visited'
        }
        setGrid(newGrid)
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
            <button type="button" onClick={handleClick}>
                Dijkstra
            </button>
            <div className="grid">{displayGrid}</div>
        </div>
    )
}
export default Visualizer
