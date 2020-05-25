import React, { useState } from 'react'
import './Node.css'

function Node(props) {
    const { setStartNode, setGoalNode } = props
    const { isStart, isGoal, row, col } = props.properties

    const propertyClassName = isStart ? 'node-start' : isGoal ? 'node-goal' : ''

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
            draggable={isStart || isGoal ? 'true' : 'false'}
            onDragStart={handleDragStart}
            onDragOver={handleOnDragOver}
            onDrop={handleDrop}
            id={`node-${row}-${col}`}
        />
    )
}
export default Node
