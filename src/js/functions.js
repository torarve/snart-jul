export function xmasEve(date) {
    return new Date(date.getFullYear(), 11, 24)
}
export function isXmas(date) {
    const xmas = xmasEve(date);
    const last = new Date(date.getFullYear(), 0, 14);
    return date>=xmas || date<last;
}

export function firstSundayOfAdvent(year) {
    const xmas = new Date(year, 11, 24);
    return new Date(year, 11, 24-xmas.getDay()-3*7);
}

export function xmasFeeling(date) {
    const month = date.getMonth();
    const day = date.getDate();
    const xmas = xmasEve(date);
    switch(month) {
        case 1:
            if (day<14) {
                return (date-new Date(date.getFullYear(), 0, 1)) / 31;
            }

            return 0.0;
        case 10:
        case 11:
            const startAdvent = firstSundayOfAdvent(date.getFullYear());
            if (date<startAdvent) {
                const firstOfNovember = new Date(date.getFullYear(), 10, 1);
                return 0.1*(date-firstOfNovember)/(startAdvent-firstOfNovember);
            }
            else if(date>=xmas) {
                return 1.0;
            }
            else {
                return 0.1 + (date-startAdvent)/(xmas-startAdvent);
            }
        default:
            return 0.0;
    }
}