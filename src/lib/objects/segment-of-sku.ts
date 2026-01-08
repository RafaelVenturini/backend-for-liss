const assortedList = ['SORT', 'SRT']
const infTypeList = ['L', 'S']
const multcolorList = ['Bicolor', 'Tricolor']

export function segmentOfSku(sku: string, name: string) {
	if (!sku) return null
	if (!name) return null
	if (!isNaN(Number(sku))) return null
	const skuSegments = sku.split('-')
	if (skuSegments.length < 2) return null
	
	let blu = null
	let inf = null
	let tec = null
	let top = null
	let tam = null
	if (assortedList.includes(skuSegments[0])) {
		tam = skuSegments.includes('TU') ? 'TU' : 'TP'
		
	} else if (skuSegments.length === 4) {
		if (infTypeList.includes(skuSegments[0][0])) {
			inf = skuSegments[0]
			tec = skuSegments[1]
			tam = skuSegments[2]
		} else {
			blu = skuSegments[0]
			tec = skuSegments[1]
			tam = skuSegments[2]
		}
		
	} else if (skuSegments.length === 5) {
		inf = skuSegments[0]
		top = skuSegments[1]
		tec = skuSegments[2]
		tam = skuSegments[3]
	}
	
	const {mul, cor} = colorDefiner(skuSegments, name)
	return {blu, inf, top, tec, tam, cor, mul}
}


function colorDefiner(skuSegments: string[], name: string) {
	let mul = null
	let cor = null;
	const segmSize = skuSegments.length;
	const isMulticolor = multcolorList.some(keyword =>
		name.split(' ').includes(keyword)
	);
	
	if (isNaN(Number(skuSegments[segmSize - 1]))) {
		return {mul: null, cor: null}
	}
	if (isMulticolor) {
		mul = skuSegments[segmSize - 1];
	} else {
		cor = skuSegments[segmSize - 1];
	}
	
	return {mul, cor}
}