/*
    Suppose the content library contains the following titles: "duel", "dule", "speed", "spede", "deul", "cars". 
    How would you efficiently implement a functionality so that if a user misspells speed as spede, 
    they are shown the correct title?
*/

var titles = ["duel","dule","speed","spede","deul","cars", "seedp"];

var query = "spede";

const getCharFreqMap = (str = '') => {
    const map = new Map();
    for(let char of str) {
        map.set(char, !map.has(char) ? 1 : map.get(char) + 1);
    }
    return map;
}

const filterTitles = (titles = [], query = '') => {
    const result = [];
    const queryMap = getCharFreqMap(query);
    return titles
        .filter(title => title.length === query.length)
        .filter(title => {
            const frq = getCharFreqMap(title);
            for(let [key, val] of Object.entries(frq)) {
                if(queryMap.has(key) && queryMap.get(key) === val) continue;
                return false;
            }
            return true;
        })
}

console.log(filterTitles(titles, query)); // [ 'speed', 'spede', 'seedp' ]