import React, { useState, useEffect } from 'react'
import Node from './Node/Node'
import './Visualizer.css'

const ROWS = 20
const COLUMNS = 50

const startNodeRow = 9
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

    const displayGrid = grid.map((row, rowIdx) => {
        return (
            <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    return <Node key={rowIdx + nodeIdx} properties={node} />
                })}
            </div>
        )
    })
    return <div className="grid">{displayGrid}</div>
}
export default Visualizer
