export default function recursiveDivisionMaze(
    grid,
    rowStart,
    rowEnd,
    colStart,
    colEnd,
    isHorizontal,
    nodesToAnimate
) {
    if (rowStart > rowEnd || colStart > colEnd) return

    if (isHorizontal) {
        let possibleRows = []
        for (let num = rowStart; num <= rowEnd; num += 2) {
            possibleRows.push(num)
        }
        let possibleCols = []
        for (let num = colStart - 1; num <= colEnd + 1; num += 2) {
            possibleCols.push(num)
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length)
        let randomColIndex = Math.floor(Math.random() * possibleCols.length)
        let wallRow = possibleRows[randomRowIndex]
        let wallPassage = possibleCols[randomColIndex]

        grid.forEach((row) => {
            row.forEach((node) => {
                if (
                    node.row === wallRow &&
                    node.col !== wallPassage &&
                    node.col >= colStart - 1 &&
                    node.col < colEnd + 1 &&
                    !node.isStart &&
                    !node.isGoal
                ) {
                    node.isWall = true
                    nodesToAnimate.push(node)
                }
            })
        })
        if (wallRow - 2 - rowStart > colEnd - colStart) {
            recursiveDivisionMaze(
                grid,
                rowStart,
                wallRow - 2,
                colStart,
                colEnd,
                true,
                nodesToAnimate
            )
        } else {
            recursiveDivisionMaze(
                grid,
                rowStart,
                wallRow - 2,
                colStart,
                colEnd,
                false,
                nodesToAnimate
            )
        }
        if (rowEnd - (wallRow + 2) > colEnd - colStart) {
            recursiveDivisionMaze(
                grid,
                wallRow + 2,
                rowEnd,
                colStart,
                colEnd,
                true,
                nodesToAnimate
            )
        } else {
            recursiveDivisionMaze(
                grid,
                wallRow + 2,
                rowEnd,
                colStart,
                colEnd,
                false,
                nodesToAnimate
            )
        }
    } else {
        let possibleCols = []
        let possibleRows = []
        for (let num = rowStart - 1; num <= rowEnd + 1; num += 2) {
            possibleRows.push(num)
        }
        for (let num = colStart; num <= colEnd; num += 2) {
            possibleCols.push(num)
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length)
        let randomColIndex = Math.floor(Math.random() * possibleCols.length)
        let wallCol = possibleCols[randomColIndex]
        let wallPassage = possibleRows[randomRowIndex]

        grid.forEach((row) => {
            row.forEach((node) => {
                if (
                    node.row !== wallPassage &&
                    node.col === wallCol &&
                    node.row >= rowStart - 1 &&
                    node.row <= rowEnd + 1 &&
                    !node.isStart &&
                    !node.isGoal
                ) {
                    node.isWall = true
                    nodesToAnimate.push(node)
                }
            })
        })
        if (rowEnd - rowStart > wallCol - 2 - colStart) {
            recursiveDivisionMaze(
                grid,
                rowStart,
                rowEnd,
                colStart,
                wallCol - 2,
                true,
                nodesToAnimate
            )
        } else {
            recursiveDivisionMaze(
                grid,
                rowStart,
                rowEnd,
                colStart,
                wallCol - 2,
                false,
                nodesToAnimate
            )
        }
        if (rowEnd - rowStart > colEnd - (wallCol + 2)) {
            recursiveDivisionMaze(
                grid,
                rowStart,
                rowEnd,
                wallCol + 2,
                colEnd,
                true,
                nodesToAnimate
            )
        } else {
            recursiveDivisionMaze(
                grid,
                rowStart,
                rowEnd,
                wallCol + 2,
                colEnd,
                false,
                nodesToAnimate
            )
        }
    }
}

function chooseOrientation(width, height) {
    if (width < height) return true
    else if (height < width) return false
    else return Math.random() >= 0.5 ? true : false
}
