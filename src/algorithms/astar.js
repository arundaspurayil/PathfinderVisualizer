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
        if (currentNode.isWall) {
            continue
        }
        visitedNodes.push(currentNode)
        if (currentNode.isGoal) return visitedNodes

        const neighbors = getNeighbors(grid, currentNode)
        for (const node of neighbors) {
            if (node.isWall) {
                const { row, col } = node
                if (grid[row + 1][col - 1].isWall) break
                if (grid[row - 1][col + 1].isWall) break
            }

            let stepCost =
                node.row - currentNode.row === 0 ||
                node.col - currentNode.col === 0
                    ? 1
                    : Math.sqrt(2)

            const newCost = currentNode.g + stepCost
            if (!node.isVisited || newCost < node.g) {
                node.g = newCost
                node.h = calculateHeuristic(node, goalNode)
                node.distance = node.g + node.h
                node.isVisited = true
                node.previousNode = currentNode
                queue.push(node)
                visitedNodes.push(node)
            }
        }
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

    //if bottom and right nodes added then you can add diagonal
    //get diagonals
    if (
        row > 0 &&
        col > 0 &&
        row < grid.length - 1 &&
        col < grid[0].length - 1
    ) {
        neighbors.push(grid[row + 1][col + 1])
        neighbors.push(grid[row + 1][col - 1])
        neighbors.push(grid[row - 1][col + 1])
        neighbors.push(grid[row - 1][col - 1])
    }

    return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function sortNodesByDistance(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}
