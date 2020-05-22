function dijkstra(grid, startNode, goalNode) {
    let visitedNodes = []
    startNode.distance = 0
    let unvisitedNodes = getAllNodes(grid)
    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        closestNode.isVisited = true
        visitedNodes.push(closestNode)
        if (closestNode.isGoal) {
            return visitedNodes
        }

        updateNeighbors(grid, closestNode)
    }
    return visitedNodes
}

function getAllNodes(grid) {
    let nodes = []

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            nodes.push(grid[row][col])
        }
    }
    return nodes
}

export { dijkstra, getNodesInShortestPath }
