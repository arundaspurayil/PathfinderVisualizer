import getNeighbors from './getneighbors'

function bfs(grid, startNode) {
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
                queue.push(node)
            })
        }
    }
    return visitedNodes
}

export default bfs
