import {Anexo} from "@api/tiny/interfaces.js";
import {ClothsResult} from "@plugins/interface.js";

export function tinyAnexos(anexos: Anexo[]) {
	return JSON.stringify(anexos.map(x => x.anexo)).replaceAll("'", '"');
}

export function colorPicker(cloths: ClothsResult[], name: string) {
	const clothList = cloths.map(c => c.nome)
	const regex = new RegExp(clothList.join('|'))
	const splitName = name.split(regex)
	const colorName = splitName[1].trim()
	const prefix =
		name.includes('Bicolor') ?
			'Bicolor ' :
			name.includes('Tricolor') ?
				'Tricolor ' : ''
	return prefix + colorName
}