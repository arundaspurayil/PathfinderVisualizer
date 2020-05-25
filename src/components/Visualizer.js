import React, { useState, useEffect, useRef } from 'react'
import Node from './Node/Node'
import './Visualizer.css'

import dijkstra from '../algorithms/dijkstra'
import bfs from '../algorithms/bfs'
import dfs from '../algorithms/dfs'
import astar from '../algorithms/astar'

import getNodesInShortestPath from '../algorithms/getNodesInShortestPath'

const ROWS = 20
const COLUMNS = 30

const startNodeRow = 9
const startNodeCol = 5
const goalNodeRow = 3
const goalNodeCol = 29

function Visualizer() {
    const [grid, setGrid] = useState([])
    const [algorithm, setAlgorithm] = useState('dijkstra')
    const gridRef = useRef(null)

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
        let rowGrid = Array.from(gridRef.current.children)

        for (let node of nodes) {
            setTimeout(function () {
                rowGrid[node.row].children[node.col].setAttribute(
                    'class',
                    'node node-shortest-path'
                )
            }, 100 * count)
            count += 1
        }
    }

    function animateVisitedNodes(visitedNodes, shortestPathToGoal) {
        let count = 0
        let rowGrid = Array.from(gridRef.current.children)
        for (let node of visitedNodes) {
            setTimeout(function () {
                rowGrid[node.row].children[node.col].attributes[0].nodeValue +=
                    ' node-visited'
            }, 10 * count)
            if (node.isGoal) {
                setTimeout(function () {
                    animateShortestPath(shortestPathToGoal)
                }, 10 * count)
            }
            count += 1
        }
    }

    function resetStyling() {
        let rowGrid = Array.from(gridRef.current.children)

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const isStart = row === startNodeRow && col === startNodeCol
                const isGoal = row === goalNodeRow && col === goalNodeCol

                const node = rowGrid[row].children[col]
                const attribute = isStart
                    ? 'node node-start'
                    : isGoal
                    ? 'node node-goal'
                    : 'node'

                node.setAttribute('class', attribute)
            }
        }
    }
    function runAlgorithm(event) {
        event.preventDefault()

        resetStyling()
        const startNode = grid[startNodeRow][startNodeCol]
        const goalNode = grid[goalNodeRow][goalNodeCol]
        let visitedNodes = []
        if (algorithm === 'dijkstra') visitedNodes = dijkstra(grid, startNode)
        else if (algorithm === 'bfs') visitedNodes = bfs(grid, startNode)
        else if (algorithm === 'dfs') visitedNodes = dfs(grid, startNode)
        else if (algorithm === 'astar')
            visitedNodes = astar(grid, startNode, goalNode)

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
            <select
                value={algorithm}
                onChange={(event) => {
                    setAlgorithm(event.target.value)
                }}
            >
                <option value="dijkstra">Dijkstra</option>+
                <option value="astar">A*</option>
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
            </select>
            <button type="button" onClick={runAlgorithm}>
                Visualize!
            </button>
            <div id="grid" ref={gridRef} className="grid">
                {displayGrid}
            </div>
        </div>
    )
}
export default Visualizer
