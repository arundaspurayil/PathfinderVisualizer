import React from 'react'
import './Node.css'

function Node(props) {
    const {
        setStartNode,
        setGoalNode,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
    } = props
    const { isStart, isGoal, isWall, row, col } = props.properties

    const propertyClassName = isStart
        ? 'node-start'
        : isGoal
        ? 'node-goal'
        : isWall
        ? 'node-wall'
        : ''

    function handleDragStart(event) {
        const { target } = event
        event.dataTransfer.setData(
            'nodeId',
            JSON.stringify({ isStart, isGoal, id: target.id })
        )

        setTimeout(() => {
            target.style.visibility = 'hidden'
        }, 0)
    }

    function handleOnDragOver(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    function handleDrop(event) {
        event.preventDefault()
        const {
            isStart: originalIsStart,
            isGoal: originalIsGoal,
            id: originalid,
        } = JSON.parse(event.dataTransfer.getData('nodeId'))

        if (originalIsStart) setStartNode({ row, col })
        else if (originalIsGoal) setGoalNode({ row, col })

        const node = document.getElementById(originalid)
        setTimeout(() => {
            node.style.visibility = 'visible'
        }, 0)
    }

    return (
        <div
            className={`node  ${propertyClassName}`}
            onMouseDown={(event) => {
                handleMouseDown(event, row, col)
            }}
            onMouseEnter={(event) => {
                handleMouseEnter(event, row, col)
            }}
            onMouseUp={handleMouseUp}
            id={`node-${row}-${col}`}
        />
    )
}
export default Node
