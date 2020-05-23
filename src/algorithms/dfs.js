function dfs(grid, startNode) {
    let visitedNodes = []
    let queue = [startNode]

    while (queue.length > 0) {
        let currentNode = queue.shift()
        if (currentNode.isVisited === false) {
            currentNode.isVisited = true
            visitedNodes.push(currentNode)

            if (currentNode.isGoal) {
                return visitedNodes
            }

            let neighborNodes = getNeighbors(grid, currentNode)
            neighborNodes.forEach((node) => {
                node.previousNode = currentNode
                queue.unshift(node)
            })
        }
    }
    return visitedNodes
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

export default dfs
