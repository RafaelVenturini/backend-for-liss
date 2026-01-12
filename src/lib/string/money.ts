export function toBLR(money: number | string) {
	return Number(money).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	})
}