import {RowDataPacket} from "mysql2/promise";

export interface InsertFitUser {
	cliente_id: string;
	nome: string;
	dia_cadastro: string;
	telefone: string;
	email: string;
	nuvem_id: number;
}

export interface InsertFitAddress {
	cliente_id: string;
	cep: string;
	rua: string;
	numero: string;
	complemento: string;
	bairro: string;
	cidade: string;
	estado: string;
	pais: string;
	criacao: string;
}

export interface InsertFitOrder {
	pedido_id: number;
	endereco_id: number;
	cliente_id: string;
	frete: string;
	subtotal: string;
	desconto: string;
	total: string;
	entregadora: string;
	tipo_entrega: string;
	plataforma: string;
	cod_rastreio: string;
	data_pedido: string;
	metodo_pagamento: string;
	bandeira: string;
	parcelamento: string;
	status: string;
}

export interface fixImgResult extends RowDataPacket {
	tiny_id: number
}

export interface ClothsResult extends RowDataPacket {
	nome: string;
}