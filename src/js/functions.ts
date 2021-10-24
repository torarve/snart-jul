export function xmasEve(date): Date {
    return new Date(date.getFullYear(), 11, 24, 16, 0, 0);
}
export function isXmas(date): boolean {
    const xmas = xmasEve(date);
    const last = new Date(date.getFullYear(), 0, 14);
    return date>=xmas || date<last;
}

export function firstSundayOfAdvent(year): Date {
    const xmas = new Date(year, 11, 24);
    return new Date(year, 11, 24-xmas.getDay()-3*7);
}

export function xmasFeeling(date: Date): number {
    const month = date.getMonth();
    const day = date.getDate();
    const xmas = xmasEve(date);
    switch(month) {
        case 0:
            if (day<14) {
                //return (date-new Date(date.getFullYear(), 0, 1)) / 31;
                const janFirst = new Date(date.getFullYear(), 0, 1);
                return 1.0 - (date-janFirst)/(new Date(date.getFullYear(), 0, 14)-janFirst);
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
                return 0.1 + 0.9*(date-startAdvent)/(xmas-startAdvent);
            }
        default:
            return 0.0;
    }
}
