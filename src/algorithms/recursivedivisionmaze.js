export default function recursiveDivisionMaze(grid, x, y, width, height) {
    if (width <= 2 || height <= 2) return
    const isHorizontal = Math.floor(Math.random() * 2) % 2

    let wx = x + isHorizontal ? Math.floor(Math.random() * (height - 2)) : 0
    let wy = y + isHorizontal ? 0 : Math.floor(Math.random() * (width - 2))

    let px = wx + isHorizontal ? Math.floor(Math.random() * height) : 0
    let py = wy + isHorizontal ? 0 : Math.floor(Math.random() * width)

    let dx = isHorizontal ? 0 : 1
    let dy = isHorizontal ? 1 : 0
    let length = isHorizontal ? width : height
    console.log(isHorizontal)
    console.log(length - 1)
    console.log(wx, wy)
    console.log(dx, dy)
    for (let x = 0; x < length - 1; x++) {
        if (wx !== px || wy !== py) {
            console.log(`WX ${wx} ${wy}`)
            console.log(`PX ${px} ${py}`)
            grid[wx][wy].isWall = true
        }
        wx += dx
        wy += dy
    }
}
