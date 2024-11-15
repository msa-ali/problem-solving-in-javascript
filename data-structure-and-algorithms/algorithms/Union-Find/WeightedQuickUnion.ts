// Running Time
// Find - takes time proportional to depth of p and q - lg N
// Union - takes constant time, given roots, lg N
// Depth of any node is at most lg N where lg = base-2 logarithm
export class QuickUnionUF {
    private id: number[];
    private size: number;
    private nodeSize: number[];

    constructor(n: number) {
        this.size = n;
        this.id = new Array(n).fill(0).map((_, i) => i);
        this.nodeSize = new Array(n).fill(0).map(() => 1);

    }

    public connected(p: number, q: number): boolean {
        return this.root(p) === this.root(q);
    }

    public union(p: number, q: number): void {
        const i = this.id[q];
        const j = this.id[p];

        for (let i = 0; i < this.size; i++) {
            if(this.nodeSize[i] < this.nodeSize[j]){
                this.id[i] = j;
                this.nodeSize[j] += this.nodeSize[i];
            } else {
                this.id[j] = i;
                this.nodeSize[i] += this.nodeSize[j];
            }
        }
    }

    private root(node: number): number {
        // chase parent pointers until reaches root
        while (this.id[node] !== node) node = this.id[node];
        return node;
    }
}