/**
  0 - empty cell, 1 - fresh orange, 2 - rotten orange
  every minute - rot
 * @param {number[][]} grid
 * @return {number}
 */

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];


var orangesRotting = function(grid) {
    if(!grid || !grid.length) return -1;
    
    const m = grid.length;
    const queue = [];
    let numOfFreshOranges = 0, totalMinutes = 0;
    
    for(let i = 0; i< m; i++) {
        for(j = 0; j< grid[i].length; j++) {
            switch(grid[i][j]) {
                case 1:
                    numOfFreshOranges++;
                    break;
                case 2:
                    queue.push([i,j]);
                    break;
            }
        }
    }
    if(numOfFreshOranges === 0) return 0;
    
    if(queue.length === 0 && numOfFreshOranges > 0) return -1;
    
    let queueLength = queue.length;
    console.log(queue);
    while(queue.length) {
        const current = queue.shift();
        queueLength--;
        const isLevelEnd = queueLength === 0;
        for(let [x,y] of directions) {
            const currentX = current[0] + x;
            const currentY = current[1] + y;
            if(
                currentX < 0 ||
                currentX >= m ||
                currentY < 0 ||
                currentY >= grid[currentX].length ||
                grid[currentX][currentY] !== 1
            ) {
                continue;
            }
            grid[currentX][currentY] = 2;
            numOfFreshOranges--;
            queue.push([currentX, currentY]);
        }
        if(isLevelEnd){
            totalMinutes++;
            queueLength = queue.length;
            console.log(queue);
        }
    }
    return numOfFreshOranges !== 0 ? -1 : totalMinutes-1;
};

/*
 Sequential Order:
    - get all initial rotten oranges
    - count total number of fresh oranges
*/