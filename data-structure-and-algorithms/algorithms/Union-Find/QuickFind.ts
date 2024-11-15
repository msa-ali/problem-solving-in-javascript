// Union - O(n)
// Find - O(1)
// Init - O(n)
export class QuickFindUF {
    private id: number[];
    private size: number;

    constructor(n: number) {
        this.size = n;
        this.id = new Array(n).fill(0).map((_, i) => i);
    }

    public connected(p: number, q: number): boolean {
        return this.id[p] === this.id[q];
    }

    public union(p: number, q: number): void {
        const newId = this.id[q];
        const previousId = this.id[p];

        for(let i = 0; i < this.size; i++) {
            if (this.id[i] === previousId) {
                this.id[i] = newId;
            }
        }
    }
}