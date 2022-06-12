/*
Feature - Find all the people on Facebook that are in a user’s friend circle.

First, we need to find all the people that are in each user’s friends circle on Facebook. 
Your individual friend circle is defined as a group of users who are directly or indirectly friends with you. 
Assume there are a total of n users on Facebook. Some of them are your friends and others are not. 
The friendship/connection is transitive in nature. For example, if Shaw is a direct friend of Andy, 
and Andy is a direct friend of Noah, then Shaw is an indirect friend of Noah. 
Getting the total number of friend circles that exist on Facebook helps us suggest connections on Instagram 
for every user.

We’ll be provided with an n x n square matrix, where n is the number of users on Facebook. A cell [i,j] will hold the value 1 if user i and user j are friends. Otherwise, the cell will hold the value 0.
 */

function friendCircles(friends, n) {
    if (n === 0) {
        return 0;
    }

    let circleCount = 0;

    const visited = new Array(n).fill(0);

    for (let i = 0; i < n; ++i) {
        if (visited[i] === 0) {
            visited[i] = 1;
            dfs(friends, n, visited, i);
            circleCount++;
        }
    }
    return circleCount;
}

function dfs(friends, n, visited, index) {
    for (let x = 0; x < n; ++x) {
        if (friends[index][x] === 1 && visited[x] === 0) {
            if (x !== index) {
                visited[x] = 1;
                dfs(friends, n, visited, x)
            }
        }
    }
}

var n = 4;

var friends = [
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1]
];

console.log("Number of friend circles:", friendCircles(friends, n))