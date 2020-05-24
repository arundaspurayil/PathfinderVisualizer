import React from 'react'
import './Node.css'

function Node(props) {
    const { onMouseDown } = props
    const { isStart, isGoal, row, col } = props.properties

    const propertyClassName = isStart ? 'node-start' : isGoal ? 'node-goal' : ''

    return (
        <div
            className={`node  ${propertyClassName}`}
            id={`node-${row}-${col}`}
            onMouseDown={(event) => {
                onMouseDown(event, row, col)
            }}
            onMouseUp={(event) => {
                onMouseDown(event, row, col)
            }}
        />
    )
}
export default Node
