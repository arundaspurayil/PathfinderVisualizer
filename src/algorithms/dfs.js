import getNeighbors from './getneighbors'

function dfs(grid, startNode) {
    let visitedNodes = []
    let queue = [startNode]

    while (queue.length > 0) {
        let currentNode = queue.shift()
        if (currentNode.isWall) continue

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

export default dfs
