function getNodesInShortestPath(goalNode) {
    let nodes = []
    let temp = goalNode
    while (temp != null) {
        nodes.unshift(temp)
        temp = temp.previousNode
    }
    return nodes
}

export default getNodesInShortestPath
