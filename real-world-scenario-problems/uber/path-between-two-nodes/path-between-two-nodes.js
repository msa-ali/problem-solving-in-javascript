/*
    we need to build a functionality to select a path from the driver’s location to the user’s location. 
    All the drivers have to pass through multiple checkpoints to reach the user’s location. 
    Each road between checkpoints will have a cost, which we learned how to calculate in the previous lesson. 
    It is possible that some of the k chosen drivers might not have a path to the user due to unavailability. 
    Unavailability can occur due to a driver already being in a ride that has ended but not reached its location. 
    In some cases, the driver can also get booked by another user and become unavailable. 
    The driver that has the path to the user’s location with the minimum accumulated cost will be selected.

    We’ll be given a city map GMap as an array of different checkpoints. 
    Another array pathCosts, at each index, will represent the cost of traveling between the corresponding checkpoints in GMap. 
    We are also given some drivers, where each drivers[i] represents a single driver node. 
    We need to determine whether a path from the driver node drivers[i] to a user node exists or not. 
    If the path exists, return the accumulated sum of the checkpoints between the two nodes. Otherwise, return -1.

    GMap has the values [["a","b"],["b","c"],["a","e"],["d","e"]].

    pathCosts has the values [12,23,26,18].

    drivers has the values ["c", "d", "e", "f"].

    user has a value "a".
*/

const totalCost = (GMap = [], pathCosts = [], drivers = [], user = 'a') => {
    const graph = {};
    // build the graph
    for(let [index, checkpoint] of Object.entries(GMap)) {
        const [p1, p2] = checkpoint;
        if(!graph[p1]) graph[p1] = {};
        if(!graph[p2]) graph[p2] = {};
        graph[p1] [p2] = pathCosts[index];
        graph[p2] [p1] = pathCosts[index];
    }
    // Find Cost for each driver
    const result = new Array(drivers.length).fill(0);
    for(let [i, driver] of Object.entries(drivers)) {
        if(!graph[driver] || !graph[user]) {
            result[i] = -1;
        } else {
            const visited = new Set();
            result[i] = dfs(graph, driver, visited, 0);
        }
    }
    return result;
}

const dfs = (graph, currentNode, visited = new Set(), cost, targetNode) => {
    visited.add(currentNode);
    const adjacentNodes = Object.keys(graph[currentNode]);
    let result = -1;
    if(adjacentNodes.includes(targetNode)) {
        result = cost + graph[currentNode][targetNode];
    } else {
        for (let node of adjacentNodes) {
            if(visited.has(node)) continue;
            result = dfs(graph, node, visited, graph[currentNode][node], targetNode);
            if(result !== -1) break;
        }
    }
    visited.delete(currentNode);
    return result;
}

var G_map = [["a","b"],["b","c"],["a","e"],["d","e"]]
var path_costs = [12.0,23.0,26.0,18.0]
var drivers = ["c", "d", "e", "f"]
var user = "a"
var all_path_costs = totalCost(G_map, path_costs, drivers, user)
console.log("Total cost of all paths", all_path_costs)