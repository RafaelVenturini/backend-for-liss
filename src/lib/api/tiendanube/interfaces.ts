export interface Customer {
	id: number,
	name: string;
	email: string;
	identification: string;
	phone: string;
	note: any,
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

export interface Order {
	id: number,
	token: string;
	store_id: string;
	contact_email: string;
	contact_name: string;
	contact_phone: string;
	contact_identification: string;
	shipping_min_days: number,
	shipping_max_days: number,
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
	billing_customer_type: any,
	billing_business_name: any,
	billing_trade_name: any,
	billing_state_registration: any,
	billing_fiscal_regime: any,
	billing_business_activity: any,
	billing_invoice_use: any,
	billing_document_type: any,
	shipping_cost_owner: string;
	shipping_cost_customer: string;
	coupon: [],
	promotional_discount: PromotionalDiscount,
	subtotal: string;
	discount: string;
	discount_coupon: any,
	discount_gateway: string;
	total: string;
	total_usd: string;
	checkout_enabled: boolean,
	checkout_enabled_validation_messages: [],
	weight: string;
	currency: string;
	language: string;
	gateway: string;
	gateway_id: string;
	gateway_name: string;
	shipping: string;
	shipping_option: string;
	shipping_option_code: string;
	shipping_option_reference: string;
	shipping_pickup_details: any,
	shipping_tracking_number: any,
	shipping_tracking_url: any,
	shipping_store_branch_name: any,
	shipping_store_branch_extra: any,
	shipping_pickup_type: string;
	shipping_suboption: [],
	extra: {},
	storefront: string;
	note: string;
	owner_note: any,
	created_at: string;
	updated_at: string;
	completed_at: CompletedAt,
	next_action: string;
	payment_details: PaymentDetails,
	attributes: [],
	free_shipping_config: any,
	payment_count: number,
	payment_status: string;
	order_origin: any,
	same_billing_and_shipping_address: boolean,
	total_paid: string;
	customer: Customer,
	products: TiendanubeProduct[],
	customer_visit: CustomerVisit,
	fulfillments: Fullfillments[],
	number: number,
	cancel_reason: any,
	cancelled_at: any,
	closed_at: any,
	read_at: any,
	status: string;
	gateway_link: any,
	has_shippable_products: boolean,
	shipping_carrier_name: string;
	shipping_address: Address,
	shipping_status: string;
	shipped_at: any,
	paid_at: string;
	landing_url: string;
	client_details: ClientDetails,
	app_id: any
}

export interface CompletedAt {
	date: string;
	timezone_type: number,
	timezone: string;
}

export interface PaymentDetails {
	method: string;
	credit_card_company: string;
	installments: string;
}

export interface TiendanubeProduct {
	id: number,
	depth: string;
	height: string;
	name: string;
	name_without_variants: any,
	price: string;
	compare_at_price: string;
	product_id: number,
	image: Image,
	quantity: string;
	free_shipping: boolean,
	weight: string;
	width: string;
	variant_id: string;
	variant_values: [],
	properties: [],
	sku: string;
	barcode: any,
	has_promotional_price: boolean,
	promotions: {
		percentage_off: number
	},
	cost: any
}

export interface Image {
	id: number,
	product_id: number,
	src: string;
	position: number,
	alt: [],
	height: number,
	width: number,
	thumbnails_generated: number,
	created_at: string;
	updated_at: string;
}

export interface CustomerVisit {
	created_at: string;
	landing_page: string;
	utm_parameters: {
		utm_campaign: any,
		utm_content: any,
		utm_medium: any,
		utm_source: any,
		utm_term: any
	}
}

export interface ClientDetails {
	browser_ip: string;
	user_agent: string;
}

export interface PromotionalDiscount {
	id: any,
	store_id: number,
	order_id: string;
	created_at: string;
	total_discount_amount: string;
	contents: [],
	promotions_applied: []
}

export interface AssignedLocation {
	location_id: string;
	name: string;
	address: {
		zipcode: string;
		street: string;
		number: string;
		floor: string;
		locality: string;
		city: string;
		reference: string;
		between_streets: string;
		province: {
			code: string;
			name: string;
		},
		region: {
			code: string;
			name: string;
		},
		country: {
			code: string;
			name: string;
		}
	}
}

export interface LineItens {
	id: string;
	external_id: string;
	quantity: number,
	variant: {
		variant_id: string;
	},
	product: {
		product_id: string;
	},
	unit_price: {
		value: number,
		currency: string;
	},
	unit_dimension: {
		weight: number,
		height: number,
		width: number,
		depth: number
	},
	stock_transfer: {
		from_location_id: null
	},
	created_at: string;
	updated_at: string;
}

export interface Shipping {
	type: string;
	carrier: {
		carrier_id: string;
		code: string;
		name: string;
		app_id: string;
	},
	option: {
		name: string;
		code: string;
		reference: string;
		allow_free_shipping: boolean
	},
	merchant_cost: {
		value: number,
		currency: string;
	},
	consumer_cost: {
		value: number,
		currency: string;
	},
	min_delivery_date: string;
	max_delivery_date: string;
	pickup_details: null,
	extras: {
		free_shipping_info: {
			free_shipping_id: string;
			consumer_original_cost: {
				value: number,
				currency: string;
			}
		},
		phone_required: boolean,
		id_required: boolean,
		show_time: boolean,
		shippable: boolean
	},
	estimated_delivery_time: {
		min: {
			days: number,
			business_days: number,
			date: string;
		},
		max: {
			days: number,
			business_days: number,
			date: string;
		}
	}
}

export interface TrackingEvents {
	id: string;
	status: string;
	description: string;
	address: string;
	geolocation: null,
	happened_at: string;
	estimated_delivery_at: string;
	app_id: string;
	created_at: string;
	updated_at: string;
}

export interface StatusHistory {
	from_status: string;
	to_status: string;
	happened_at: string;
	created_at: string;
	user_id: string;
	app_id: string;
}

export interface Fullfillments {
	id: string;
	app_id: string;
	number: string;
	total_quantity: number,
	total_weight: number,
	total_price: {
		value: number,
		currency: string;
	},
	assigned_location: AssignedLocation,
	line_items: LineItens[],
	recipient: {
		name: string;
		phone: string;
		identifier: string;
		email: string;
	},
	shipping: Shipping,
	discounts: [
		{
			type: string;
			amount: {
				value: number,
				currency: string;
			}
		}
	],
	destination: {
		zipcode: string;
		street: string;
		number: string;
		floor: string;
		locality: string;
		city: string;
		reference: null,
		between_streets: null,
		province: {
			code: string;
			name: string;
		},
		region: {
			code: string;
			name: string;
		},
		country: {
			code: string;
			name: string;
		}
	},
	status: string;
	status_history: StatusHistory[],
	tracking_info: {
		url: null,
		code: string;
	},
	tracking_info_history: [
		{
			from_tracking_info: {
				url: null,
				code: null
			},
			to_tracking_info: {
				url: null,
				code: string;
			},
			happened_at: string;
			created_at: string;
			app_id: string;
			user_id: string;
		}
	],
	tracking_events: TrackingEvents[],
	labels: [],
	legacy_labels: [],
	fulfilled_at: string;
	created_at: string;
	updated_at: string;
}

export interface Coupon {
	id: number,
	code: string,
	type: string,
	value: string,
	valid: boolean,
	used: number,
	max_uses: number,
	includes_shipping: boolean,
	start_date: string,
	start_time: string,
	end_date: string,
	end_time: string,
	min_price: null,
	categories: null,
	products: null,
	first_consumer_purchase: boolean,
	max_uses_per_client: number,
	is_deleted: boolean,
	combines_with_other_discounts: boolean,
	only_cheapest_shipping: boolean,
	max_discount_amount: null
}