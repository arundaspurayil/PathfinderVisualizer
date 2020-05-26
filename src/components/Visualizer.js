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

function Visualizer() {
    const [grid, setGrid] = useState([])
    const [algorithm, setAlgorithm] = useState('dijkstra')
    const [startNode, setStartNode] = useState({ row: 3, col: 5 })
    const [goalNode, setGoalNode] = useState({ row: 3, col: 29 })
    const [mouseDown, setMouseDown] = useState(false)

    const gridRef = useRef(null)

    useEffect(() => {
        function createNode(row, col) {
            return {
                row,
                col,
                isStart: row === startNode.row && col === startNode.col,
                isGoal: row === goalNode.row && col === goalNode.col,
                distance: Infinity,
                isVisited: false,
                isWall: checkIfWall(row, col),
                previousNode: null,
            }
        }
        function createGrid() {
            let nodes = []

            for (let row = 0; row < ROWS; row++) {
                let currentRow = []
                for (let col = 0; col < COLUMNS; col++) {
                    currentRow.push(createNode(row, col))
                }
                nodes.push(currentRow)
            }
            return nodes
        }

        setGrid(createGrid())
    }, [algorithm, startNode, goalNode])

    function checkIfWall(row, col) {
        const element = document.getElementById(`node-${row}-${col}`)
        if (element && element.className.includes('node-wall')) return true
        return false
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
        shortestPathToGoal.shift()
        shortestPathToGoal.pop()
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
                const isStart = row === startNode.row && col === startNode.col
                const isGoal = row === goalNode.row && col === goalNode.col
                const isWall = checkIfWall(row, col)

                const node = rowGrid[row].children[col]
                const attribute = isStart
                    ? 'node node-start'
                    : isGoal
                    ? 'node node-goal'
                    : isWall
                    ? 'node node-wall'
                    : 'node'

                node.setAttribute('class', attribute)
            }
        }
    }
    function runAlgorithm(event) {
        event.preventDefault()

        resetStyling()
        const start = grid[startNode.row][startNode.col]
        const goal = grid[goalNode.row][goalNode.col]
        let visitedNodes = []
        console.log(goal)
        if (algorithm === 'dijkstra') visitedNodes = dijkstra(grid, start)
        else if (algorithm === 'bfs') visitedNodes = bfs(grid, start)
        else if (algorithm === 'dfs') visitedNodes = dfs(grid, start)
        else if (algorithm === 'astar') visitedNodes = astar(grid, start, goal)

        const shortestPathToGoal = getNodesInShortestPath(goal)

        animateVisitedNodes(visitedNodes, shortestPathToGoal)
    }

    function handleMouseDown(event, row, col) {
        //setGrid(getGridWithWalls(row, col))
        setMouseDown(true)
        let rowGrid = Array.from(gridRef.current.children)
        const node = rowGrid[row].children[col]
        const attribute = grid[row][col].isWall ? 'node' : 'node node-wall'
        node.setAttribute('class', attribute)
    }

    function handleMouseEnter(event, row, col) {
        if (!mouseDown) return
        let rowGrid = Array.from(gridRef.current.children)
        const node = rowGrid[row].children[col]
        const attribute = grid[row][col].isWall ? 'node' : 'node node-wall'

        node.setAttribute('class', attribute)
    }

    function handleMouseUp(event) {
        event.preventDefault()
        setMouseDown(false)

        const newGrid = [...grid]
        let rowGrid = Array.from(gridRef.current.children)
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const node = rowGrid[row].children[col]

                if (node.className.includes('node-wall')) {
                    newGrid[row][col].isWall = true
                } else {
                    newGrid[row][col].isWall = false
                }
                //Do this a better way
                newGrid[row][col].previousNode = null
                newGrid[row][col].distance = Infinity
                newGrid[row][col].isVisited = false
            }
        }

        setGrid(newGrid)
    }
    const displayGrid = grid.map((row, rowIdx) => {
        return (
            <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    return (
                        <Node
                            key={rowIdx + nodeIdx}
                            properties={node}
                            setStartNode={setStartNode}
                            setGoalNode={setGoalNode}
                            handleMouseDown={handleMouseDown}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseUp={handleMouseUp}
                        />
                    )
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
