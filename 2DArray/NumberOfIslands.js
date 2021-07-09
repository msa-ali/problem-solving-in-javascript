/**
 * https://leetcode.com/problems/number-of-islands/
 * @param {character[][]} grid
 * @return {number}
 */
const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];


var numIslands = function (grid) {
    if (!grid || !grid.length) return 0;
    const m = grid.length;
    let islandCount = 0;

    for (let i = 0; i < m; i++) {
        const n = grid[i].length;
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                grid[i][j] = 0;
                const queue = [[i, j]];
                while (queue.length) {
                    const [currentX, currentY] = queue.shift();
                    for (let [x, y] of directions) {
                        if (currentX + x < 0 ||
                            currentX + x >= m ||
                            currentY + y < 0 ||
                            currentY + y >= n ||
                            grid[currentX + x][currentY + y] === '0'
                        ) {
                            continue;
                        }
                        queue.push([currentX + x, currentY + y]);
                        grid[currentX + x][currentY + y] = '0';
                    }
                }
            }
        }
    }
    return islandCount;
};

const grid = [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]];

console.log(numIslands(grid));