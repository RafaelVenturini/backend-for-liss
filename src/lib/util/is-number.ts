export function isNumber(n: number | string) {
    return !isNaN(Number(n));
}

console.log(isNumber(123))