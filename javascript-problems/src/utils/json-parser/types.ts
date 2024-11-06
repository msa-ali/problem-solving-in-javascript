export type TokenType = 
    | "BraceOpen"
    | "BraceClose"
    | "BracketOpen"
    | "BracketClose"
    | "Comma"
    | "String"
    | "Number"
    | "Colon"
    | "True"
    | "False"
    | "Null";

export interface Token {
    type: TokenType;
    value: string;
}

export class ParseError extends Error {
    constructor(index: number, value: string) {
        const message = `Unexpected token "${value}" at index: ${index}`;
        super(message);
    }
}

export type ASTNode = 
    | { type: 'Object'; value: Record<string, ASTNode> }
    | { type: "Array"; value: ASTNode[] }
    | { type: "String"; value: string }
    | { type: "Number"; value: number }
    | { type: "Boolean"; value: boolean }
    | { type: "Null"; value: null };