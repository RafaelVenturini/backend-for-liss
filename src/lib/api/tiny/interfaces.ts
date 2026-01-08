export interface GetProduct {
	retorno: {
		status_processamento: string;
		status: string;
		produto: OneProduct
		codigo_erro: string | null,
		erros: TinyError[] | null
	}
}

export interface TinyError {
	erro: string;
}

export interface OneProduct {
	id: string;
	nome: string;
	codigo: string;
	unidade: string;
	preco: number;
	preco_promocional: number;
	ncm: string;
	origem: string;
	gtin: string;
	gtin_embalagem: string;
	localizacao: string;
	peso_liquido: number;
	peso_bruto: number;
	estoque_minimo: number;
	estoque_maximo: number;
	id_fornecedor: number;
	nome_fornecedor: string;
	codigo_fornecedor: string;
	codigo_pelo_fornecedor: string;
	unidade_por_caixa: string;
	preco_custo: number;
	preco_custo_medio: number;
	situacao: string;
	tipo: string;
	classe_ipi: string;
	valor_ipi_fixo: string;
	cod_lista_servicos: string;
	descricao_complementar: string,
	garantia: string;
	cest: string;
	obs: string;
	tipoVariacao: string;
	variacoes: string;
	idProdutoPai: string;
	sob_encomenda: string;
	dias_preparacao: string;
	marca: string;
	tipoEmbalagem: string;
	alturaEmbalagem: string;
	comprimentoEmbalagem: string;
	larguraEmbalagem: string;
	diametroEmbalagem: string;
	qtd_volumes: string;
	categoria: string;
	anexos: Anexo[],
	imagens_externas: [],
	classe_produto: string;
	seo_title: string;
	seo_keywords: string;
	link_video: string;
	seo_description: string;
	slug: string;
}

export interface Anexo {
	anexo: string;
}

export interface GetProductsByDate {
	retorno: {
		status_processamento: string;
		status: string;
		pagina: string;
		numero_paginas: number;
		produtos: ByDateProducts[]
	}
}

export interface ByDateProducts {
	produto: MultiProduct
}

export interface MultiProduct {
	id: string;
	data_criacao: string;
	nome: string;
	codigo: string;
	preco: number,
	preco_promocional: number;
	unidade: string;
	gtin: string;
	tipoVariacao: string;
	localizacao: string;
	preco_custo: number;
	preco_custo_medio: number;
	situacao: string;
}