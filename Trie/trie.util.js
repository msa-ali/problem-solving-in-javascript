/**
 * Basic Introduction to Trie - https://www.youtube.com/watch?v=zIjfhVPRZCg
 */

class TrieNode {
    constructor(val){
        this.val = val;
        this.children = new Map();
    }

    insertChar(char) {
        if(char && !this.children.has(char)) {
            this.children.set(char, new TrieNode(char));
        }
    }
}

class Trie {
    
    constructor() {
        this.root = new TrieNode('*');   
    }
    /**
     * Inserts a word into the trie. 
     * @param {string} word
     * @return {void}
    */
    insertWord(word) {
        let current = this.root;
        if(word && typeof word === 'string') {
            word.split('').forEach(char => {
                current.insertChar(char);
                current = current.children.get(char);
            })
            current.insertChar('*'); // to signify end of word in trie
        }
    }
    /**
     * Returns if the word is in the trie. 
     * @param {string} word
     * @return {boolean} boolean
    */
    search(word) {
        let current = this.root;
        if(word && typeof word === 'string') {
            for(let char of word.split(''))  {
                if(!current.children.has(char)) return false;
                current = current.children.get(char);
            };
            return current.children.has('*'); // to signify end of word in trie
        }
    }
    /**
     * Returns if there is any word in the trie that starts with the given prefix. 
     * @param {string} prefix
     * @return {boolean} boolean
    */
    startsWith(prefix) {
        let current = this.root;
        if(prefix && typeof prefix === 'string') {
            for(let char of prefix.split('')) {
                if(!current.children.has(char)) return false;
                current = current.children.get(char);
            };
            return true;
        }
    }
}

const trie = new Trie();
trie.insertWord('Altamash');
trie.insertWord('Ali');
console.log(trie.search('Ali')); // true
console.log(trie.search('Altamash')); // true
console.log(trie.search('Altamish')); // false
console.log(trie.startsWith('Alta')); // true
console.log(trie.startsWith('Ma')); // false