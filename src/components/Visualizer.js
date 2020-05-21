import React, { useState, useEffect } from 'react'
import Node from './Node/Node'
import './Visualizer.css'

function Visualizer() {
    const ROWS = 20
    const COLUMNS = 50
    const [grid, setGrid] = useState([])

    useEffect(() => {
        let nodes = []
        for (let row = 0; row < ROWS; row++) {
            let currentRow = []
            for (let col = 0; col < COLUMNS; col++) {
                currentRow.push([])
            }
            nodes.push(currentRow)
        }
        setGrid(nodes)
    }, [])

    const displayGrid = grid.map((row, rowIdx) => {
        return (
            <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    return <Node key={rowIdx + nodeIdx} />
                })}
            </div>
        )
    })
    console.log(displayGrid)
    return <div className="grid">{displayGrid}</div>
}
export default Visualizer
