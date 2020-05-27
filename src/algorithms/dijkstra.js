import TinyQueue from 'tinyqueue'
import getNeighbors from './getneighbors'
function dijkstra(grid, startNode) {
    let visitedNodes = []
    startNode.distance = 0
    let unvisitedNodes = new TinyQueue([startNode], function (node1, node2) {
        return node1.distance - node2.distance
    })
    while (unvisitedNodes.length > 0) {
        const currentNode = unvisitedNodes.pop()
        currentNode.isVisited = true
        if (currentNode.isWall) continue
        visitedNodes.push(currentNode)
        if (currentNode.isGoal) {
            return visitedNodes
        }
        const neighbors = getNeighbors(grid, currentNode)
        neighbors.forEach((node) => {
            if (node.distance > currentNode.distance + 1) {
                node.distance = currentNode.distance + 1
                node.previousNode = currentNode
                unvisitedNodes.push(node)
            }
        })
    }
    return visitedNodes
}

export default dijkstra
