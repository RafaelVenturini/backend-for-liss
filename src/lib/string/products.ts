import {Anexo} from "@api/tiny/interfaces.js";

export function tinyAnexos(anexos: Anexo[]) {
	return JSON.stringify(anexos.map(x => x.anexo)).replaceAll("'", '"');
}