/*
    A spanning-tree of a connected, undirected graph is a subgraph that is a tree and connects all the vertices. 
    One graph can have many different spanning trees. 
    A graph with n vertices has a spanning tree with n−1 edges.
    Cover all the vertices with minimum possible edges
    Spanning tree is a subset of graph.
    spanning tree can't be disconnected.
    If number of vertices  = v. no. of edges in min. spanning trees = v - 1
    No cycle

    A weight can be assigned to each edge of the graph. 
    The weight of a spanning tree is the sum of weights of all the edges of the spanning tree. 
    A minimum spanning tree(MST) for a weighted, connected and undirected graph is a spanning tree with a weight
     less than or equal to the weight of every other spanning tree.
*/

class VertexMst {
    constructor(id, visited) {
      this.id = id;
      this.visited = visited;
    }
  }
  
  class EdgeMst {
    constructor(weight, visited, src, dest) {
      this.weight = weight;
      this.visited = visited;
      this.src = src;
      this.dest = dest;
    }
  }
  
  class GraphMst {
    constructor(g, e) {
      this.g = g;
      this.e = e;
    }
  
    // This method returns the vertex with a given id if it
    // already exists in the graph, returns NULL otherwise
    vertexExists(id) {
      for (let i = 0; i < this.g.length; i++) {
        if (this.g[i].id === id) {
          return this.g[i];
        }
      }
      return null;
    }
    // This method generates the graph with v vertices
    // and e edges
    generateGraph(vertices, edges) {
      // create vertices
      for (let i = 0; i < vertices; i++) {
        let v = new VertexMst(i + 1, false);
        this.g.push(v);
      }
  
      // create edges
      for (let i = 0; i < edges.length; i++) {
        let src = this.vertexExists(edges[i][1]);
        let dest = this.vertexExists(edges[i][2]);
        let e = new EdgeMst(edges[i][0], false, src, dest);
        this.e.push(e);
      }
    }
    // This method finds the MST of a graph using
    // Prim's Algorithm
    // returns the weight of the MST
    findMinSpanningTree() {
      let vertex_count = 0;
      let weight = 0;
  
      // Add first vertex to the MST
      let current = this.g[0];
      current.visited = true;
      vertex_count++;
  
      // Construct the remaining MST using the
      // smallest weight edge
      while (vertex_count < this.g.length) {
        let smallest = null;
  
        for (let i = 0; i < this.e.length; i++) {
          if (this.e[i].visited === false) {
            if (this.e[i].src.visited === true &&
                this.e[i].dest.visited === false) {
              if (smallest == null || this.e[i].weight < smallest.weight) {
                smallest = this.e[i];
              }
            }
          }
        }
  
        smallest.visited = true;
        smallest.dest.visited = true;
        weight += smallest.weight;
        vertex_count++;
      }
      return weight;
    }
  
    getGraph() {
      res = ""
      for (let i = 0; i < this.e.length; i++) {
        res += "[" + this.e[i].src.id + "->" +
                    this.e[i].dest.id + "], ";
      }
      return res;
    }
  
    printGraph() {
      for (let i = 0; i < this.g.length; i++) {
        console.log(this.g[i].id + " " + this.g[i].visited);
      }
  
      for (let i = 0; i < this.e.length; i++) {
        console.log(this.e[i].src.id + "->" +
                    this.e[i].dest.id + "[" +
                    this.e[i].weight + ", " +
                    this.e[i].visited + "]  ");
      }
  
    }
  
    printMst(w) {
      console.log("MST");
      for (let i = 0; i < this.e.length; i++) {
        if (this.e[i].visited === true) {
          console.log(this.e[i].src.id + "->" + this.e[i].dest.id);
        }
      }
      console.log("weight: " + w);
    }
  }
  
  let gr = [];
  let ed = [];
  let g = new GraphMst(gr, ed);
  let v = 5;
  let e = [[1, 1, 2],
           [1, 1, 3],
           [2, 2, 3],
           [3, 2, 4],
           [3, 3, 5],
           [2, 4, 5]
          ];
  
  g.generateGraph(v, e);
  console.log("Testing graph 1...");
  // g.printGraph();
  let w = g.findMinSpanningTree();
  g.printMst(w);
  
  gr = [];
  ed = [];
  g = new GraphMst(gr, ed);
  v = 7;
  e = [
    [2, 1, 4],
    [1, 1, 3],
    [2, 1, 2],
    [1, 3, 4],
    [3, 2, 4],
    [2, 3, 5],
    [2, 4, 7],
    [1, 5, 6],
    [2, 5, 7]
  ];
  
  g.generateGraph(v, e);
  console.log("Testing graph 2...");
  // g.printGraph();
  w = g.findMinSpanningTree();
  g.printMst(w);