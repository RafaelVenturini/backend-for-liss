import {expect, test} from "vitest"
import {segmentOfSku} from "@/lib/objects/segment-of-sku.js";

test.each([
	{sku: '', name: "", expected: null},
	{sku: 'LBO-TSI-COM-TU-', name: "", expected: null},
	{sku: 'LBO--COM-TU-', name: "", expected: null},
	{sku: 'LBO- -COM-TU-', name: "", expected: null},
	{sku: 'LBO-TSI-COM-TU-113', name: "", expected: null},
	{
		sku: '',
		name: "Legging Bolso + Top Si Compressão Cacau",
		expected: null
	},
	{
		sku: 'LBO-TSI-COM-TU-113',
		name: "Legging Bolso + Top Si Compressão Cacau",
		expected: {
			blu: null,
			inf: 'LBO',
			top: 'TSI',
			tec: 'COM',
			tam: 'TU',
			cor: '113',
			mul: null
		}
		
	},
	{
		sku: 'SSP-KIA-COM-TP-424',
		name: "Short Spin + Top Kiara Bicolor Compressão Azul Capri e Ciano Candy",
		expected: {
			blu: null,
			inf: 'SSP',
			top: 'KIA',
			tec: 'COM',
			tam: 'TP',
			cor: null,
			mul: '424'
		}
		
	},
	{
		sku: 'SORT-S-TU-053',
		name: "Short Sortido Tamanho Único Verde Militar",
		expected: {
			blu: null,
			inf: null,
			top: null,
			tec: null,
			tam: 'TU',
			cor: '053',
			mul: null
		}
		
	},
	{
		sku: 'SRT-MAC-AMA-COM-TU',
		name: "Macacão Amanda Bicolor Compressão Cor Aleatória Tamanho Único",
		expected: {
			blu: null,
			inf: null,
			top: null,
			tec: null,
			tam: 'TU',
			cor: null,
			mul: null
		}
	},
	{
		sku: 'SORT-T-TU-008',
		name: "Top Sortido Tamanho Único Azul Escuro",
		expected: {
			blu: null,
			inf: null,
			top: null,
			tec: null,
			tam: 'TU',
			cor: '008',
			mul: null
		}
		
	},
	{
		sku: 'MAC-AMA-COM-TU-431',
		name: "Macacão Amanda Bicolor Compressão Carbono e Branco",
		expected: {
			blu: null,
			inf: 'MAC',
			top: 'AMA',
			tec: 'COM',
			tam: 'TU',
			cor: null,
			mul: '431'
		}
	},
	{
		sku: 'RCC-DRY-M-122',
		name: "Regata Corte nas Costas Dryfit Creme – M",
		expected: {
			blu: 'RCC',
			inf: null,
			top: null,
			tec: 'DRY',
			tam: 'M',
			cor: '122',
			mul: null
		}
		
	},
])("sku: $sku | Name: $name", ({sku, name, expected}) => {
	const result = segmentOfSku(sku, name);
	expect(result).toEqual(expected);
});