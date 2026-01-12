export function databaseDate(date: Date | string) {
	if (typeof date === 'string') date = new Date(date)
	return date.toLocaleString("sv-SE", {
		timeZone: "America/Sao_Paulo"
	});
}

export function normalDate(date: Date | string) {
	if (typeof date === 'string') date = new Date(date)
	return date.toLocaleDateString("pt-BR", {
		timeZone: "America/Sao_Paulo"
	});
}

export function calculateDate(date: Date, days: number) {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() + days)
	return new Date(newDate)
}