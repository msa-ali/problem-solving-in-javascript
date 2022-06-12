const adjacencyList = [
    [1, 3],
    [0],
    [3, 8],
    [0, 2, 4, 5],
    [3, 6],
    [3],
    [4, 7],
    [6],
    [2]
  ];
  
  const traversalDFS = function(vertex, graph, values, seen) {
    values.push(vertex);
    seen[vertex] = true;
  
    const connections = graph[vertex];
    for(let i = 0; i < connections.length; i++) {
      const connection = connections[i];
  
      if(!seen[connection]) {
        traversalDFS(connection, graph, values, seen);
      }
    }
  }
  
  const values = [];
  traversalDFS(0, adjacencyList, values, {})
  
  console.log(values);