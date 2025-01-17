function animateShortestPath(nodes, gridRef) {
    let count = 0
    let rowGrid = Array.from(gridRef.current.children)

    for (let node of nodes) {
        setTimeout(function () {
            rowGrid[node.row].children[node.col].setAttribute(
                'class',
                'node node-shortest-path'
            )
        }, 100 * count)
        count += 1
    }
}

export const animateVisitedNodes = (
    visitedNodes,
    shortestPathToGoal,
    gridRef
) => {
    let count = 0
    shortestPathToGoal.shift()
    shortestPathToGoal.pop()
    let rowGrid = Array.from(gridRef.current.children)
    for (let node of visitedNodes) {
        setTimeout(function () {
            rowGrid[node.row].children[node.col].attributes[0].nodeValue +=
                ' node-visited'
        }, 10 * count)
        if (node.isGoal) {
            setTimeout(function () {
                animateShortestPath(shortestPathToGoal, gridRef)
            }, 10 * count)
        }
        count += 1
    }
}
export const animateMaze = (nodes, gridRef) => {
    let count = 0
    let rowGrid = Array.from(gridRef.current.children)
    for (let node of nodes) {
        setTimeout(function () {
            rowGrid[node.row].children[node.col].attributes[0].nodeValue =
                'node node-wall'
        }, 20 * count)

        count += 1
    }
}
