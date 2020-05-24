export default function astar(grid, startNode, goalNode) {
    let visitedNodes = []
    startNode.distance = 0
    startNode.g = 0
    let queue = [startNode]

    //distance = f

    while (queue.length > 0) {
        sortNodesByDistance(queue)
        const currentNode = queue.shift()
        currentNode.isVisited = true
        visitedNodes.push(currentNode)
        if (currentNode.isGoal) return visitedNodes

        const neighbors = getNeighbors(grid, currentNode)
        neighbors.forEach((node) => {
            const newCost = currentNode.g + 1
            if (!node.isVisited || newCost < node.g) {
                node.g = newCost
                node.h = calculateHeuristic(node, goalNode)
                node.distance = node.g + node.h
                node.isVisited = true
                node.previousNode = currentNode
                queue.push(node)
            }
        })
    }
    return visitedNodes
}

function calculateHeuristic(node, goalNode) {
    return Math.abs(node.row - goalNode.row) + Math.abs(node.col - goalNode.col)
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
