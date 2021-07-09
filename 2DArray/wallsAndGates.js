/*
    Given a 2D Array containing -1's as walls, 0's (gates) and INF as empty room.
    Fill each empty room with the number of steps to the nearest gate.
    If it is impossible to reach a gate, leave INF as the value. INF === 2147483647

    Examples:

    [
        [INF, -1, 0, INF],
        [INF, INF, INF, -1],
        [INF, -1, INF, -1],
        [0, -1, INF, INF]
    ]

    Output: [
        [3, -1, 0, 1],
        [2, 2, 1, -1],
        [1, -1, 2, -1],
        [0, -1, 3, 4]
    ]
*/

const INF = 2147483647;

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const wallsAndGates = (grid = [[]]) => {

    const gates = [];

    const m = grid.length;

    // fill all the gates available in the grid
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === 0) gates.push([i,j]);
        }
    }

    if(gates.length === 0) return grid;

    for(let gate of gates) {
        dfs(grid, gate);
    }
    return grid;
}

const dfs = (grid = [[]], currentGate = [], count = 0) => {
    const [gateX, gateY] = currentGate;
    const m = grid.length;
    if (gateX < 0 || gateX >= m || gateY < 0 || gateY >= grid[0].length || count > grid[gateX][gateY]) return
    grid[gateX][gateY] = count;
    for(let [x, y] of directions) {
        const currentX = x + gateX;
        const currentY = y + gateY;
        dfs(grid, [currentX, currentY], count + 1);
    }
};

const grid = [
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [INF, -1, INF, -1],
    [0, -1, INF, INF]
];

console.log(wallsAndGates(grid));


