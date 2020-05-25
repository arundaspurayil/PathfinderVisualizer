import React from 'react'
import './Node.css'

function Node(props) {
    const { onDragOver, onDrop } = props
    const { isStart, isGoal, row, col } = props.properties

    const propertyClassName = isStart ? 'node-start' : isGoal ? 'node-goal' : ''

    function handleDragStart(event) {
        const { target } = event
        event.dataTransfer.setData('nodeId', target.id)

        setTimeout(() => {
            target.style.opacity = 0
        }, 0)
    }

    function handleOnDragOver(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    function handleDrop(event) {
        event.preventDefault()
        const { target } = event
        const targetId = target.id
        const nodeId = event.dataTransfer.getData('nodeId')
        const node = document.getElementById(nodeId)
        console.log(node)
        node.style.opacity = 1
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
