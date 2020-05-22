import React from 'react'
import './Node.css'

function Node(props) {
    const { properties } = props

    const propertyClassName = properties.isStart
        ? 'node-start'
        : properties.isGoal
        ? 'node-goal'
        : ''

    return <div className={`node ${propertyClassName}`} />
}
export default Node