import TinyQueue from 'tinyqueue'
import manhattanHeuristic from './heuristics'
import getNeighbors from './getneighbors'

export default function astar(grid, startNode, goalNode) {
    let visitedNodes = []
    startNode.distance = 0
    startNode.g = 0

    let unvisitedNodes = new TinyQueue([startNode], function (node1, node2) {
        return node1.distance - node2.distance
    })
    //distance = f

    while (unvisitedNodes.length > 0) {
        const currentNode = unvisitedNodes.pop()
        currentNode.isVisited = true
        if (currentNode.isWall) continue
        visitedNodes.push(currentNode)
        if (currentNode.isGoal) return visitedNodes

        const neighbors = getNeighbors(grid, currentNode)
        for (const node of neighbors) {
            const newCost = currentNode.g + 1
            if (!node.isVisited || newCost < node.g) {
                node.g = newCost
                node.h = manhattanHeuristic(node, goalNode)
                node.distance = node.g + node.h
                node.isVisited = true
                node.previousNode = currentNode
                unvisitedNodes.push(node)
                visitedNodes.push(node)
            }
        }
    }
    return visitedNodes
}
