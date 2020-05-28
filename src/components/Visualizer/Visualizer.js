import React, { useState, useEffect, useRef, useCallback } from 'react'
import Node from '../Node/Node'
import './Visualizer.css'

import dijkstra from '../../algorithms/dijkstra'
import bfs from '../../algorithms/bfs'
import dfs from '../../algorithms/dfs'
import astar from '../../algorithms/astar'
import greedybestfirstsearch from '../../algorithms/greedybestfirstsearch'

import getNodesInShortestPath from '../../algorithms/getNodesInShortestPath'

const ROWS = 25
const COLUMNS = 45

function Visualizer() {
    const [grid, setGrid] = useState([])
    const [algorithm, setAlgorithm] = useState('dijkstra')
    const [startNode, setStartNode] = useState({ row: 3, col: 5 })
    const [goalNode, setGoalNode] = useState({ row: 22, col: 40 })
    const [mouseDown, setMouseDown] = useState(false)
    const [startMouseDown, setStartMouseDown] = useState(false)
    const [goalMouseDown, setGoalMouseDown] = useState(false)
    const gridRef = useRef(null)

    const createNode = useCallback(
        (row, col, checkWalls) => {
            return {
                row,
                col,
                isStart: row === startNode.row && col === startNode.col,
                isGoal: row === goalNode.row && col === goalNode.col,
                distance: Infinity,
                isVisited: false,
                isWall: checkWalls ? checkIfWall(row, col) : false,
                previousNode: null,
            }
        },
        [startNode, goalNode]
    )
    const createGrid = useCallback(
        (checkWalls = true) => {
            let nodes = []

            for (let row = 0; row < ROWS; row++) {
                let currentRow = []
                for (let col = 0; col < COLUMNS; col++) {
                    currentRow.push(createNode(row, col, checkWalls))
                }
                nodes.push(currentRow)
            }
            return nodes
        },
        [createNode]
    )
    useEffect(() => {
        setGrid(createGrid())
    }, [algorithm, startNode, goalNode, createGrid, createNode])

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
    function clearGrid(event) {
        event.preventDefault()
        const newGrid = createGrid(false)
        setGrid(newGrid)
        resetStyling()
    }
    function runAlgorithm(event) {
        event.preventDefault()

        resetStyling()
        const start = grid[startNode.row][startNode.col]
        const goal = grid[goalNode.row][goalNode.col]
        let visitedNodes = []
        if (algorithm === 'dijkstra') visitedNodes = dijkstra(grid, start)
        else if (algorithm === 'bfs') visitedNodes = bfs(grid, start)
        else if (algorithm === 'dfs') visitedNodes = dfs(grid, start)
        else if (algorithm === 'astar') visitedNodes = astar(grid, start, goal)
        else if (algorithm === 'gbfs')
            visitedNodes = greedybestfirstsearch(grid, start, goal)

        const shortestPathToGoal = getNodesInShortestPath(goal)
        animateVisitedNodes(visitedNodes, shortestPathToGoal)
    }

    function handleMouseDown(event, row, col) {
        let rowGrid = Array.from(gridRef.current.children)
        const node = rowGrid[row].children[col]
        if (startNode.row === row && startNode.col === col)
            setStartMouseDown(true)
        else if (goalNode.row === row && goalNode.col === col)
            setGoalMouseDown(true)
        else {
            setMouseDown(true)
            const attribute = grid[row][col].isWall ? 'node' : 'node node-wall'
            node.setAttribute('class', attribute)
        }
    }
    function handleMouseLeave(event, row, col) {
        if (startMouseDown || goalMouseDown) {
            let rowGrid = Array.from(gridRef.current.children)
            const node = rowGrid[row].children[col]
            const attribute = grid[row][col].isWall ? 'node node-wall' : 'node'
            node.setAttribute('class', attribute)
        }
    }
    function handleMouseEnter(event, row, col) {
        if (!startMouseDown && !goalMouseDown && !mouseDown) return

        let rowGrid = Array.from(gridRef.current.children)
        const node = rowGrid[row].children[col]
        let attribute = ''
        if (startMouseDown) {
            attribute = 'node node-start'
        } else if (goalMouseDown) {
            attribute = 'node node-goal'
        } else {
            attribute = grid[row][col].isWall ? 'node' : 'node node-wall'
        }

        node.setAttribute('class', attribute)
    }
    function createNewGridWithWalls() {
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
    function handleMouseUp(event, row, col) {
        event.preventDefault()
        let rowGrid = Array.from(gridRef.current.children)
        const node = rowGrid[row].children[col]

        if (mouseDown) {
            setMouseDown(false)
            createNewGridWithWalls()
        } else if (startMouseDown) {
            setStartMouseDown(false)
            setStartNode({ row: row, col: col })
            node.setAttribute('class', 'node node-start')
        } else if (goalMouseDown) {
            setGoalMouseDown(false)
            setGoalNode({ row: row, col: col })
            node.setAttribute('class', 'node node-goal')
        }
    }
    const displayGrid = grid.map((row, rowIdx) => {
        return (
            <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    return (
                        <Node
                            key={rowIdx + nodeIdx}
                            properties={node}
                            handleMouseDown={handleMouseDown}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseUp={handleMouseUp}
                            handleMouseLeave={handleMouseLeave}
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
                <option value="gbfs">Greedy Best First Search</option>
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
            </select>
            <button type="button" onClick={runAlgorithm}>
                Visualize!
            </button>
            <button type="button" onClick={clearGrid}>
                Clear
            </button>
            <div draggable="false" id="grid" ref={gridRef} className="grid">
                {displayGrid}
            </div>
        </div>
    )
}
export default Visualizer
