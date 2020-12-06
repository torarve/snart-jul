export function isXmas(date) {
    const xmas = new Date(date.getFullYear(), 11, 24);
    const last = new Date(date.getFullYear(), 0, 14);
    return date>=xmas || date<last;
}
