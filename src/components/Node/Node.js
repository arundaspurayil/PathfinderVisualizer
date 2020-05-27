import React from 'react'
import './Node.css'

function Node(props) {
    const {
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        handleMouseLeave,
    } = props
    const { isStart, isGoal, isWall, row, col } = props.properties

    const propertyClassName = isStart
        ? 'node-start'
        : isGoal
        ? 'node-goal'
        : isWall
        ? 'node-wall'
        : ''

    return (
        <div
            className={`node  ${propertyClassName}`}
            onMouseDown={(event) => {
                handleMouseDown(event, row, col)
            }}
            onMouseEnter={(event) => {
                handleMouseEnter(event, row, col)
            }}
            onMouseUp={(event) => {
                handleMouseUp(event, row, col)
            }}
            onMouseLeave={(event) => {
                handleMouseLeave(event, row, col)
            }}
            id={`node-${row}-${col}`}
        />
    )
}
export default Node
