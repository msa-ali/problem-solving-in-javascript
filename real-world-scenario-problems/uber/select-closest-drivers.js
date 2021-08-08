/*
    Problem: Select at least the n nearest drivers within the user’s vicinity, avoiding the drivers that are too far away.

    Approach:

    There are numerous Uber drivers roaming around in a city. 
    For simplicity, we’ll consider the city as a Cartesian plane and assign the coordinates (0, 0) to the user’s location. 
    When a user wants to book a ride, we’ll simply find k drivers with the shortest distance on the Cartesian plane. 
    Here, k is the minimum threshold for choosing the closest drivers.

    We’ll be provided an array containing a set of points on the Cartesian plane and a number k. 
    Each set of points will represent the location of a driver. We need to find the k closest drivers from the user’s location.

    The Euclidean distance between a point P(x,y) and the origin can be calculated using the following formula:

        Math.sqrt(x*x + y*y)
    
      Now that you can calculate the distance between a user and all nearby drivers, how will you find the K nearest drivers? 
    The best data structure that comes to mind to track the nearest K drivers is Heap.

    We iterate through the array and calculate the distance between each driver’s current location and the user. 
    We’ll insert the distances of the first K drivers into the Heap. 
    Each time we find a distance smaller than the maximum distance in the Heap, we do two things:
            Remove the maximum distance from the Heap
            Insert the smaller distance into the Heap
    This will ensure that we always have K minimum distances in the Heap. 
    The most efficient way to repeatedly find the maximum number among a set of numbers is to use a max-Heap.

 */

var Heap = require("./collections-master/deque");

class Location {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // used for max-heap
    lt(other) {
        return this.distanceFromUser() > other.distanceFromUser()
    }

    distanceFromUser() {
        // ignoring sqrt to calculate the distance
        return (this.x * this.x) + (this.y * this.y)
    }

    printLocation() {
        console.log("[" + this.x + ", " + this.y + "] ", end = '')
    }
}

function findClosestDrivers(locations, k) {
    maxHeap = new Heap()
    // put first 'k' locations in the max heap
    for (var i = 0; i < k; i++)
        maxHeap.push(locations[i])

    // go through the remaining locations of the input array, if a point is closer to the origin than the top point
    // of the max-heap, remove the top point from heap and add the point from the input array
    for (var i = k; i < locations.length; i++) {
        if (locations[i].distanceFromUser() < maxHeap.peek().distanceFromUser())
            maxHeap.pop()
        maxHeap.push(locations[i])
    }

    // the heap has 'k' locations closest to the origin, return them in a list
    return maxHeap
}


result = findClosestDrivers([new Location(1, 3), new Location(3, 4), new Location(2, -1)], 2)
console.log("Here are the k drivers locations closest to the user in the Seattle area: ", end = '')
for (var i = 0; i < result.length; i++)
    result[i].printLocation()

/*
Time complexity #
The time complexity will be O(n×logk) because we are iterating all points and pushing them into the Heap. 
Here, n is the size of the locations array, and we are storing k points into the Heap.

Space complexity #
The memory complexity will be O(k) because we need to store k points in the Heap.
 */