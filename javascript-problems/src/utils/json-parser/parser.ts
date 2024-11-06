import { ASTNode, Token } from "./types";

export class Parser {

    private tokens: Token[];
    private current: number;

    constructor(tokens: Token[]) {
        if (!tokens.length) {
            throw new Error("Nothing to parse.");
        }
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        const ast = this.parseValue();
        return this.parseAST(ast);
    }

    private parseAST(node: ASTNode): any {
        if (node.type !== 'Object' && node.type !== 'Array') {
            return node.value;
        }
        if (node.type == 'Object') {
            const keys = Object.keys(node.value);
            const result: Record<string, any> = {};
            for(const key of keys) {
                result[key] = this.parseAST(node.value[key])
            }
            return result;
        } else {
            const result = [];
            for (const item of node.value) {
                result.push(this.parseAST(item));
            }
            return result;
        }
    }

    private nextToken() {
        return this.tokens[++this.current];
    }

    private parseValue(): ASTNode {
        const token = this.tokens[this.current];

        switch (token.type) {
            case 'String':
                return { type: 'String', value: token.value };
            case 'Number':
                return { type: 'Number', value: Number(token.value) };
            case 'True':
                return { type: 'Boolean', value: true };
            case 'False':
                return { type: 'Boolean', value: false };
            case 'Null':
                return { type: 'Null', value: null };
            case 'BraceOpen':
                return this.parseObject();
            case 'BracketOpen':
                return this.parseArray();
            default:
                throw new Error(`Unexpected token type: ${token.type}`);
        }
    }

    private parseObject() {
        const node: ASTNode = { type: 'Object', value: {} };
        let token = this.nextToken();

        while (token.type !== 'BraceClose') {
            if (token.type !== 'String') {
                throw new Error('Key should be string');
            }
            const key = token.value;
            token = this.nextToken();
            if (token.type !== 'Colon') {
                throw new Error("Expected : in key-value pair");
            }
            token = this.nextToken();
            const value = this.parseValue();
            node.value[key] = value;
            token = this.nextToken();
            if (token.type === 'Comma') {
                token = this.nextToken();
            }
        }
        return node;
    }

    private parseArray() {
        const node: ASTNode = { type: 'Array', value: [] };
        let token = this.nextToken();
        while(token.type !== 'BracketClose') {
            const value = this.parseValue();
            node.value.push(value);
            token = this.nextToken();
            if (token.type === 'Comma') {
                token = this.nextToken();
            }
        }
        return node;
    }
}