import React, { useState, useEffect } from 'react'
import Node from './Node/Node'
import './Visualizer.css'

import dijkstra from '../algorithms/dijkstra'
import bfs from '../algorithms/bfs'
import getNodesInShortestPath from '../algorithms/getNodesInShortestPath'

const ROWS = 20
const COLUMNS = 50

const startNodeRow = 10
const startNodeCol = 5
const goalNodeRow = 10
const goalNodeCol = 15

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
    function handleBfsClick(event) {
        event.preventDefault()
        const startNode = grid[startNodeRow][startNodeCol]
        const goalNode = grid[goalNodeRow][goalNodeCol]
        const visitedNodes = bfs(grid, startNode)
        const shortestPathToGoal = getNodesInShortestPath(goalNode)

        animateVisitedNodes(visitedNodes, shortestPathToGoal)
    }
    function handleDijkstraClick(event) {
        event.preventDefault()
        const startNode = grid[startNodeRow][startNodeCol]
        const goalNode = grid[goalNodeRow][goalNodeCol]
        const visitedNodes = dijkstra(grid, startNode)
        const shortestPathToGoal = getNodesInShortestPath(goalNode)

        animateVisitedNodes(visitedNodes, shortestPathToGoal)
        //animateShortestPath(shortestPathToGoal, visitedNodes.length)
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
            <button type="button" onClick={handleDijkstraClick}>
                Dijkstra
            </button>
            <button type="button" onClick={handleBfsClick}>
                BFS
            </button>
            <div className="grid">{displayGrid}</div>
        </div>
    )
}
export default Visualizer
