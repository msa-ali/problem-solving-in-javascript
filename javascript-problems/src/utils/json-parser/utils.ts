export function isNumber(value: string): boolean {
    return !Number.isNaN(value)
}

function isBoolean(value: string) {
    return value === 'true' || value === 'false';
}

export function parseBoolean(value: string) {
    if (!isBoolean(value)) {
        return undefined;
    }
    return value === 'true';
}

export function isNull(value: string) {
    return value === 'null';
}