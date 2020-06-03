export default function recursiveDivisionMaze(
    grid,
    rowStart,
    rowEnd,
    colStart,
    colEnd,
    nodesToAnimate
) {
    if (rowStart > rowEnd || colStart > colEnd) return
    const isHorizontal = chooseOrientation(colEnd - colStart, rowEnd - rowStart)
    let rowNum = isHorizontal ? rowStart : rowStart - 1
    let rowNumEnd = isHorizontal ? rowEnd : rowEnd + 1
    let colNum = isHorizontal ? colStart - 1 : colStart
    let colNumEnd = isHorizontal ? colEnd + 1 : colEnd
    let possibleRows = []
    let possibleCols = []
    for (let num = rowNum; num <= rowNumEnd; num += 2) {
        possibleRows.push(num)
    }
    for (let num = colNum; num <= colNumEnd; num += 2) {
        possibleCols.push(num)
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length)
    let randomColIndex = Math.floor(Math.random() * possibleCols.length)

    let wall = isHorizontal
        ? possibleRows[randomRowIndex]
        : possibleCols[randomColIndex]
    let wallPassage = isHorizontal
        ? possibleCols[randomColIndex]
        : possibleRows[randomRowIndex]

    grid.forEach((row) => {
        row.forEach((node) => {
            let conditonal = isHorizontal
                ? node.row === wall &&
                  node.col !== wallPassage &&
                  node.col >= colStart - 1 &&
                  node.col < colEnd + 1
                : node.row !== wallPassage &&
                  node.col === wall &&
                  node.row >= rowStart - 1 &&
                  node.row <= rowEnd + 1
            let isStartOrGoal = !node.isStart && !node.isGoal
            if (conditonal && isStartOrGoal) {
                node.isWall = true
                nodesToAnimate.push(node)
            }
        })
    })

    isHorizontal
        ? recursiveDivisionMaze(
              grid,
              rowStart,
              wall - 2,
              colStart,
              colEnd,
              nodesToAnimate
          )
        : recursiveDivisionMaze(
              grid,
              rowStart,
              rowEnd,
              wall + 2,
              colEnd,
              nodesToAnimate
          )
    isHorizontal
        ? recursiveDivisionMaze(
              grid,
              wall + 2,
              rowEnd,
              colStart,
              colEnd,
              nodesToAnimate
          )
        : recursiveDivisionMaze(
              grid,
              rowStart,
              rowEnd,
              colStart,
              wall - 2,
              nodesToAnimate
          )
}

function chooseOrientation(width, height) {
    if (width < height) return true
    else if (height < width) return false
    else return Math.random() >= 0.5 ? true : false
}
