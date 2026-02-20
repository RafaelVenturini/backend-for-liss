export function dateDiff(start: Date, end: Date) {
    let diffMs = end.getTime() - start.getTime();

    const days = Math.floor(diffMs / 86400000);
    diffMs %= 86400000;
    const hours = Math.floor(diffMs / 3600000);
    diffMs %= 3600000;
    const minutes = Math.floor(diffMs / 60000);
    diffMs %= 60000;
    const seconds = Math.floor(diffMs / 1000);

    return {days, hours, minutes, seconds};
}