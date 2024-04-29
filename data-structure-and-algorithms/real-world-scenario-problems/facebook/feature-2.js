/*
    After identifying every user’s friend circles, we need to duplicate this data to Instagram’s servers
    so it can be easily accessed and modified there as well. As the user’s name can be the same, 
    so every user on Facebook gets assigned a unique id. Each Facebook user’s connections are 
    represented and stored in a graph-like structure. We will first have to make an exact copy of this 
    structure before storing it on Instagram’s servers.
    For each user, we’ll be provided with a node and its information. This node will point to other nodes, 
    and from that one node, we need to reach and make an exact clone of every other node. 
    An edge between two nodes means that they are friends with each other. 
    A bi-directional edge means that both users follow each other, 
    whereas a uni-directional edge means that only one user follows the other.

    We can use depth-first traversal and create a copy of each node while traversing the graph. 
    To avoid getting stuck in cycles, we’ll use a hashtable to store each completed node, and 
    we will not revisit nodes that exist in the hashtable. 
    The hashtable key will be a node in the original graph, and its value will be the corresponding node 
    in the cloned graph.
 */