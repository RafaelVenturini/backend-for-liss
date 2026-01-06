export interface Customer {
	id: number,
	name: string;
	email: string;
	identification: string;
	phone: string;
	note: null,
	default_address: Address,
	addresses: Address[],
	billing_name: string;
	billing_phone: string;
	billing_address: string;
	billing_number: string;
	billing_floor: string;
	billing_locality: string;
	billing_zipcode: string;
	billing_city: string;
	billing_province: string;
	billing_country: string;
	extra: {},
	total_spent: string;
	total_spent_currency: string;
	last_order_id: number,
	active: boolean,
	first_interaction: string;
	created_at: string;
	updated_at: string;
	customer_type: string;
	business_name: string;
	trade_name: string;
	state_registration: string;
	fiscal_regime: string;
	invoice_use: string;
	document_type: string;
	business_activity: string;
	accepts_marketing: boolean,
	accepts_marketing_updated_at: string;
}

export interface Address {
	address: string;
	city: string;
	country: string;
	created_at: string;
	default: boolean,
	floor: string;
	id: number,
	locality: string;
	name: string;
	number: string;
	phone: string;
	province: string;
	updated_at: string;
	zipcode: string;
}