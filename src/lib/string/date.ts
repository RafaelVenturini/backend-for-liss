export function databaseDate(date: Date | string) {
	if (typeof date === 'string') date = new Date(date)
	return date.toLocaleString("sv-SE", {
		timeZone: "America/Sao_Paulo"
	});
}