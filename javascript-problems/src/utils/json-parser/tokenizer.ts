import { Token, ParseError, TokenType } from './types';
import { isNull, isNumber, parseBoolean } from './utils';

export function tokenizer(input: string): Token[] {
    let current = 0;
    const tokens: Token[] = [];

    while (current < input.length) {
        let char = input[current];

        switch (char) {
            case "{":
                tokens.push({ type: 'BraceOpen', value: char });
                current++;
                continue;
            case "}":
                tokens.push({ type: 'BraceClose', value: char });
                current++;
                continue;
            case "[":
                tokens.push({ type: 'BracketOpen', value: char });
                current++;
                continue;
            case "]":
                tokens.push({ type: 'BracketClose', value: char });
                current++;
                continue;
            case ":":
                tokens.push({ type: "Colon", value: char });
                current++;
                continue;
            case ",":
                tokens.push({ type: "Comma", value: char });
                current++;
                continue;
            case '"':
                let value = "";
                char = input[++current];
                while (char !== '"' && current < input.length) {
                    value += char;
                    char = input[++current];
                }
                if (char !== '"') {
                    throw new ParseError(current, char);
                }
                tokens.push({ type: "String", value });
                current++;
                continue;
        }

        // ignore whitespaces

        if (/[\w\d]/.test(char)) {
            let value = "";
            while (/[\d\w]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            if (parseBoolean(value) !== undefined) {
                const type: TokenType = parseBoolean(value) ? 'True' : 'False';
                tokens.push({ type, value })
            } else if (isNull(value)) {
                tokens.push({ type: 'Null', value })
            } else if (isNumber(value)) {
                tokens.push({ type: 'Number', value })
            } else {
                throw new ParseError(current, value);
            }
            continue;
        }

        if (/\s/.test(char)) {
            current++;
            continue;
        }
        throw new ParseError(current, char);
    }

    return tokens;
}