/*
    Calculate the max depth of water along the way between two points in a rain-affected city.
    Now that some drivers have been selected, we need to calculate the cost required to travel between different checkpoints.
    The cost depends on the amount of water accumulated in different parts of the road.
    We know that water collects on roads that are either broken or uneven.
    We will use an API to access the data regarding water on the road,
    it will transform the 3D layout of the road into a nice 2D layout of water trapped between different parts of the road.

    We’ll be given an array whose length is equal to the length of the road between two checkpoints.
    Each integer value on the array will represent the combined elevation(in cm) of the road at the points where it is broken.
    We need to find how much total water(in cm) will be accumulated in the spaces left between different elevations of the broken road.
    We need to calculate the amount of water that has accumulated above each road elevation and sum it up. At a single index/elevation (X), the amount of water depends on the heights of the highest bars to it left and right, regardless of how far apart they are. Upon further exploration, we also observe that the elevation (X) + the height of the water above this elevation, is equivalent to the minimum height of the highest bars around it. Therefore, the accumulation of the water, above a certain point (X), can be calculated using the formula:

Water = minimum ( leftMax, rightMax ) - valueX
Here, leftMax is the highest bar to the left of a certain point (X) and rightMax is the highest bar to the right of point (X).
If there is no highest bar on either side, the elevation at (X) will be considered the highest bar.

Here is how implementation will take place:

Traverse through the array once.

Calculate the leftMax for each point and save it in an array.

Traverse the array again to do the same with rightMax.

Traverse the array once more, and use this data to find the amount of water above each point using the formula mentioned above.
 */

//This method calculates the amount of water trapped. The only argument
//passed is the elevation map, in form of a array.

function pathCost(elevationMap) {

    var water = 0 //keeps track of the total water as we traverse the elevation map

    var n = elevationMap.length //number of points on the map

    //arrays to store the left_max and right_max of each point in the map

    var leftMax = new Array(n).fill(0)
    var rightMax = new Array(n).fill(0)

    //default values
    leftMax[0] = elevationMap[0]
    rightMax[n - 1] = elevationMap[n - 1]

    //filling the left_max array
    for (var i = 1; i < n; i++)
        leftMax[i] = Math.max(leftMax[i - 1], elevationMap[i])

    //filling the right_max array
    for (var i = n - 2; i >= 0; i--)
        rightMax[i] = Math.max(rightMax[i + 1], elevationMap[i])

    //calculating the amount of water
    for (var i = 0; i < n; i++)
        water += Math.min(leftMax[i], rightMax[i]) - elevationMap[i]

    return water
}

// Driver code
var elevationMap = [1, 2, 1, 3, 1, 2, 1, 4, 1, 0, 0, 2, 1, 4]
console.log("Accumulated water:", pathCost(elevationMap) + "cm")

/*
Let n be the size of the array.

Time complexity #
Since all three arrays were traversed separately and only once, the time complexity will be 

O(n).

Space complexity #

O(n) space will be required for the leftMax and rightMax arrays.
*/
