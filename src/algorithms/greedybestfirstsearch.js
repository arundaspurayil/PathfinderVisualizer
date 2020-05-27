/*
Best-First-Search( Maze m )
    Insert( m.StartNode )
    Until PriorityQueue is empty
        c <- PriorityQueue.DeleteMin
        If c is the goal
            Exit
        Else
            Foreach neighbor n of c
                If n "Unvisited"
                    Mark n "Visited"                    
                    Insert( n )
            Mark c "Examined"                    
End procedure
*/
import TinyQueue from 'tinyqueue'
import getNeighbors from './getneighbors'
import manhattanHeuristic from './heuristics'

export default function greedybestfirstsearch(grid, startNode, goalNode) {
    let visitedNodes = []
    startNode.distance = 0
    let unvisitedNodes = new TinyQueue([startNode], function (node1, node2) {
        return node1.distance - node2.distance
    })

    while (unvisitedNodes.length > 0) {
        const currentNode = unvisitedNodes.pop()
        currentNode.visited = true
        visitedNodes.push(currentNode)
        if (currentNode.isGoal) return visitedNodes
        const neighbors = getNeighbors(grid, currentNode)
        neighbors.forEach((node) => {
            if (!node.isVisited) {
                node.isVisited = true
                node.distance = manhattanHeuristic(node, goalNode)
                unvisitedNodes.push(node)
            }
        })
    }
}
function calculateHeuristic(node, goalNode) {
    return Math.abs(node.row - goalNode.row) + Math.abs(node.col - goalNode.col)
}
