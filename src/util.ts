// Counts the number of truthy values in the array (for sparse arrays where length =/= count).
export function count(array: any[]) : number {
    return array.reduce((total, current) => total + (!!current ? 1 : 0), 0)
}

// Returns an array containing int values from 0 (inclusive) to i (exclusive).
export function range(i: number) {
    return Array.from(Array(i).keys());
}

// Returns a random integer between 0 (inclusive) and max (exclusive).
export function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// Restricts x to the range between min and max (inclusive).
export function clamp(x: number, min: number, max: number) {
    if (min > max) {
        throw Error(`clamp: min (${min}) is greater than max (${max}).`);
    }
    return Math.max(Math.min(x, max), min);
}

export function isEmptyOrWhitespace(str: string) {
    const regExp = /^\s*$/;
    return regExp.test(str);
}