// https://leetcode.com/problems/time-needed-to-inform-all-employees/

const managersArray = [2, 2, 4, 6, -1, 4, 4, 5];
const informTimeArray = [0, 0, 4, 0, 7, 3, 6, 0];

const numOfMinutes = function(n, headID, managers, informTime) {
  const adjList = managers.map(() => []);
  
  for(let employee = 0; employee < n; employee++) {
    const manager = managers[employee];
    if(manager === -1) continue;
    
    adjList[manager].push(employee);
  }
  
  return dfs(headID, adjList, informTime);
};

const dfs = function(currentId, adjList, informTime) {
  if(adjList[currentId].length === 0) {
    return 0;
  }
  
  let max = 0;
  const subordinates = adjList[currentId];
  for(let i = 0; i < subordinates.length; i++) {
    max = Math.max(max, dfs(subordinates[i], adjList, informTime));
  }
  
  return max + informTime[currentId];
}

console.log(numOfMinutes(8, 4, managersArray, informTimeArray));