function dijkstra(grid, startNode) {
    let visitedNodes = []
    startNode.distance = 0
    let unvisitedNodes = getAllNodes(grid)
    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        closestNode.isVisited = true
        if (closestNode.isWall) continue
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

function getNeighbors(grid, node) {
    let neighbors = []
    const { row, col } = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function sortNodesByDistance(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}
function updateNeighbors(grid, node) {
    let neighbors = getNeighbors(grid, node)
    // for each neighbor
    for (let neighbor of neighbors) {
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
    }
}

export default dijkstra
