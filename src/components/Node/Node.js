import React from 'react'
import './Node.css'

function Node(props) {
    const { onDragOver, onDrop, setStartNode } = props
    const { isStart, isGoal, row, col } = props.properties

    const propertyClassName = isStart ? 'node-start' : isGoal ? 'node-goal' : ''

    function handleDragStart(event) {
        const { target } = event
        event.dataTransfer.setData('nodeId', target.id)

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
        const { target } = event
        const nodeId = event.dataTransfer.getData('nodeId')
        const node = document.getElementById(nodeId)
        const targetNode = target.id.split('-')
        const col = parseInt(targetNode.pop())
        const row = parseInt(targetNode.pop())
        setStartNode({ row: row, col: col })

        setTimeout(() => {
            node.style.visibility = 'visible'
        }, 0)
    }

    return (
        <div
            className={`node  ${propertyClassName}`}
            draggable={isStart ? 'true' : 'false'}
            onDragStart={handleDragStart}
            onDragOver={handleOnDragOver}
            onDrop={handleDrop}
            id={`node-${row}-${col}`}
        />
    )
}
export default Node
