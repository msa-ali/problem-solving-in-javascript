var titles = ["duel", "dule", "speed", "spede", "deul", "cars"]

function groupTitles(titles = []) {
    const res = {};
    for(let title of titles) {
        if(title) {
            const count = new Array(26).fill(0);
            for(const char of title) {
                const index = char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
                count[index] += 1
            }
            const key = count.join('');
            if(key in res) {
                res[key].push(title);
            } else {
                res[key] = [title];
            }
        }
    }
    return Object.values(res);
}


var gt = groupTitles(titles)
console.log(gt);
var query = "spede"
// console.log(gt)
for (var [_, g] of Object.entries(gt)) {
    if (g.includes(query)) {
        console.log(g)
    }
}


