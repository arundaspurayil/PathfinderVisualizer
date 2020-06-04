import React, { useState, useEffect, useRef, useCallback } from 'react'
import Node from './Node'
import Sidebar from './Sidebar'
import '../styles/Visualizer.css'
import '../styles/Main.css'

import dijkstra from '../algorithms/dijkstra'
import bfs from '../algorithms/bfs'
import dfs from '../algorithms/dfs'
import astar from '../algorithms/astar'
import greedybestfirstsearch from '../algorithms/greedybestfirstsearch'
import { animateVisitedNodes, animateMaze } from '../animate'
import recursiveDivisionMaze from '../algorithms/recursivedivisionmaze'

import getNodesInShortestPath from '../algorithms/getNodesInShortestPath'

const ROWS = 25
const COLUMNS = 35

function Visualizer() {
    const [grid, setGrid] = useState([])
    const [algorithm, setAlgorithm] = useState('dijkstra')
    const [startNode, setStartNode] = useState({ row: 3, col: 5 })
    const [goalNode, setGoalNode] = useState({ row: 22, col: 25 })
    const [mouseDown, setMouseDown] = useState(false)
    const [startMouseDown, setStartMouseDown] = useState(false)
    const [goalMouseDown, setGoalMouseDown] = useState(false)
    const gridRef = useRef(null)

    function checkIfWall(row, col) {
        const element = document.getElementById(`node-${row}-${col}`)
        if (element && element.className.includes('node-wall')) return true
        return false
    }

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

    function runAlgorithm() {
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
        animateVisitedNodes(visitedNodes, shortestPathToGoal, gridRef)
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
    function clearGrid() {
        const newGrid = createGrid(false)
        setGrid(newGrid)
        resetStyling()
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
    function animateWalls(nodesToAnimate) {
        let rows = [0, grid.length - 1]
        let cols = [0, grid[0].length - 1]

        for (let row of rows) {
            for (let y = 1; y < grid[0].length - 1; y++) {
                nodesToAnimate.push(grid[row][y])
            }
        }
        for (let col of cols) {
            for (let x = 0; x < grid.length; x++) {
                nodesToAnimate.push(grid[x][col])
            }
        }
    }
    function createMaze() {
        const newGrid = [...grid]
        let nodesToAnimate = []
        animateWalls(nodesToAnimate)
        recursiveDivisionMaze(
            newGrid,
            2,
            newGrid.length - 3,
            2,
            newGrid[0].length - 2,
            nodesToAnimate
        )
        animateMaze(nodesToAnimate, gridRef)
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
    /*
            <select
                className="col-span-3"
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
            <button className="col-span-1" type="button" onClick={runAlgorithm}>
                Visualize!
            </button>
            <button className="col-span-1" type="button" onClick={clearGrid}>
                Clear
            </button>
            <button className="col-span-1" type="button" onClick={createMaze}>
                Maze
            </button>
    */

    return (
        <div className="grid grid-cols-12">
            <Sidebar
                setAlgorithm={setAlgorithm}
                runAlgorithm={runAlgorithm}
                clearGrid={clearGrid}
                createMaze={createMaze}
            />

            <div id="grid" ref={gridRef} className="display-grid col-span-10">
                {displayGrid}
            </div>
        </div>
    )
}
export default Visualizer
