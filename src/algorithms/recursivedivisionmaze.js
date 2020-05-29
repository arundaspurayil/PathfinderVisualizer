export default function recursiveDivisionMaze(grid, x, y, width, height) {
    if (width <= 2 || height <= 2) return
    //const isHorizontal = Math.floor(Math.random() * 2) % 2
    const isHorizontal = Math.random() >= 0.5

    let wx = x + isHorizontal ? Math.floor(Math.random() * (height - 2)) : 0
    let wy = y + isHorizontal ? 0 : Math.floor(Math.random() * (width - 2))

    let px = wx + isHorizontal ? Math.floor(Math.random() * height) : 0
    let py = wy + isHorizontal ? 0 : Math.floor(Math.random() * width)

    let dx = isHorizontal ? 0 : 1
    let dy = isHorizontal ? 1 : 0
    let length = isHorizontal ? width : height

    for (let x = 0; x < length - 1; x++) {
        if (wx !== px || wy !== py) {
            grid[wx][wy].isWall = true
        }
        wx += dx
        wy += dy
    }

    /*
nx, ny = x, y
w, h = horizontal ? [width, wy-y+1] : [wx-x+1, height]
divide(grid, nx, ny, w, h, choose_orientation(w, h))

nx, ny = horizontal ? [x, wy+1] : [wx+1, y]
w, h = horizontal ? [width, y+height-wy-1] : [x+width-wx-1, height]
divide(grid, nx, ny, w, h, choose_orientation(w, h))
    */

    let nx = x
    let ny = y
    // + 1 ?
    let w = isHorizontal ? width : wy - y
    let h = isHorizontal ? wx - x : height
    recursiveDivisionMaze(grid, nx, ny, w, h)

    nx = isHorizontal ? wx : x
    ny = isHorizontal ? y : wy
    w = isHorizontal ? width : width - wy - 1
    h = isHorizontal ? height - wx - 1 : height
    recursiveDivisionMaze(grid, nx, ny, w, h)
}
