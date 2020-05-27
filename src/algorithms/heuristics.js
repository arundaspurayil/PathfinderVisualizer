export default function manhattanHeuristic(node, goalNode) {
    return Math.abs(node.row - goalNode.row) + Math.abs(node.col - goalNode.col)
}
