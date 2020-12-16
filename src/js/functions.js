export function isXmas(date) {
    const xmas = new Date(date.getFullYear(), 11, 24);
    const last = new Date(date.getFullYear(), 0, 14);
    return date>=xmas || date<last;
}

export function firstSundayOfAdvent(year) {
    const xmas = new Date(year, 11, 24);
    return new Date(year, 11, 24-xmas.getDay()-3*7);
}