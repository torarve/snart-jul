export function xmasEve(date): Date {
	return new Date(date.getFullYear(), 11, 24, 16, 0, 0);
}
export function isXmas(date): boolean {
	const xmas = xmasEve(date);
	const last = new Date(date.getFullYear(), 0, 14);
	return date >= xmas || date < last;
}

export function firstSundayOfAdvent(year): Date {
	const xmas = new Date(year, 11, 24);
	return new Date(year, 11, 24 - xmas.getDay() - 3 * 7);
}

export function xmasFeeling(date: Date, grinchMode: boolean): number {
	if (grinchMode) return grinchCalculation(date);

	return notGrinchCalculation(date);
}

export function grinchCalculation(date: Date): number {
	const month = date.getMonth();
	const day = date.getDate();
	const xmas = xmasEve(date);
	switch (month) {
		case 0:
			if (day < 14) {
				//return (date-new Date(date.getFullYear(), 0, 1)) / 31;
				const janFirst = new Date(date.getFullYear(), 0, 1);
				return (
					1.0 -
					(date - janFirst) /
						(new Date(date.getFullYear(), 0, 14) - janFirst)
				);
			}

			return 0.0;
		case 10:
		case 11:
			const startAdvent = firstSundayOfAdvent(date.getFullYear());
			if (date < startAdvent) {
				const firstOfNovember = new Date(date.getFullYear(), 10, 1);
				return (
					(0.1 * (date - firstOfNovember)) /
					(startAdvent - firstOfNovember)
				);
			} else if (date >= xmas) {
				return 1.0;
			} else {
				return (
					0.1 + (0.9 * (date - startAdvent)) / (xmas - startAdvent)
				);
			}
		default:
			return 0.0;
	}
}

export function notGrinchCalculation(date: Date): number {
	const month = date.getMonth();
	const day = date.getDate();
	const xmas = xmasEve(date);
	switch (month) {
		//januer holder følelsen godt
		case 0:
			return 1.0;
		//februar synker den jevnt
		case 1:
			const daysInFebruary = new Date(
				date.getFullYear(),
				month + 1,
				0
			).getDate();
			return (1.0 / daysInFebruary) * (daysInFebruary - (day - 1));
		//pause frem til juli da litt randomiserte sug etter julen kommer
		case 6:
			return day % 5 === 0 ? 0.25 : 0.0;
		//kjenner det nærmer seg 1. oktober, stiger gradvis til 50% 17. oktober. Holder seg så jevnt på 50% ut oktober.
		case 09:
			if (day < 18) {
				return (0.5 / 17) * day;
			}
			return 0.5;
		//stiger jevnt fra 50 til 100% i november
		case 10:
			const daysInNovember = 30;
			return (0.5 / daysInNovember) * day + 0.5;
		//komman, det er jo desember. Eller så er det JUL!!
		case 11:
			if (date >= xmas) {
				return 1.2;
			}
			return 1.0;
		//ligger alltid litt der og lurer, bare å kjenne godt nok etter så finner du det
		default:
			return 0.02;
	}
}
