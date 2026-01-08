import {linkv2, params} from "@api/tiny/utils.js";
import {
	GetProduct,
	GetProductsByDate,
	MultiProduct
} from "@api/tiny/interfaces.js";
import {sleep} from "@/lib/util/sleep.js";

export const getProduct = async (id: number) => {
	const linkPesquisa = `${linkv2}produto.obter.php${params}id=${id}`;
	const resp = await fetch(linkPesquisa)
	const data: GetProduct = await resp.json()
	return data
}

const dataProducts: MultiProduct[] = []
let page = 1

export const getProductsByDate = async (date: string): Promise<MultiProduct[]> => {
	if (page == 1) dataProducts.length = 0
	const linkPesquisa = `${linkv2}produtos.pesquisa.php${params}dataCriacao=${date}&pagina=${page}`;
	const resp = await fetch(linkPesquisa)
	const data: GetProductsByDate = await resp.json()
	
	dataProducts.push(...data.retorno.produtos.map(item => item.produto))
	
	if (data.retorno.numero_paginas > page) {
		page++
		await sleep(500)
		return await getProductsByDate(date)
	}
	page = 1
	return dataProducts
}