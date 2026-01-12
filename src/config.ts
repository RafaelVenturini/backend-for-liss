import 'dotenv/config'

const required = [
	'DB_HOST',
	'DB_PORT',
	'DB_FIT_USER',
	'DB_FIT_SHEMA',
	'DB_FIT_PASSW',
	'DB_FAS_USER',
	'DB_FAS_SHEMA',
	'DB_FAS_PASSW',
	'DB_TOO_USER',
	'DB_TOO_SHEMA',
	'DB_TOO_PASSW',
	'NVSHP_AUTH',
	'NVSHP_USER',
	'NVSHP_SHOP',
	'TINY_TKN',
	'ZUMA_TKN',
]

for (const key of required) {
	if (!process.env[key]) throw new Error(`Missing env var ${key}`)
}

export const appConfig = {
	databases: {
		fitness: {
			host: process.env.DB_HOST!,
			port: Number(process.env.DB_PORT!),
			user: process.env.DB_FIT_USER!,
			database: process.env.DB_FIT_SHEMA!,
			password: process.env.DB_FIT_PASSW!,
		},
		fashion: {
			host: process.env.DB_HOST!,
			port: Number(process.env.DB_PORT!),
			user: process.env.DB_FAS_USER!,
			database: process.env.DB_FAS_SHEMA!,
			password: process.env.DB_FAS_PASSW!,
		},
		tools: {
			host: process.env.DB_HOST!,
			port: Number(process.env.DB_PORT!),
			user: process.env.DB_TOO_USER!,
			database: process.env.DB_TOO_SHEMA!,
			password: process.env.DB_TOO_PASSW!,
		},
		
	},
	nuvemshop: {
		headers: {
			'Content-Type': 'application/json',
			'Authentication': process.env.NVSHP_AUTH!,
			'User-Agent': process.env.NVSHP_USER!
		},
		shopId: process.env.NVSHP_SHOP!,
	},
	tiny: {
		v2: {
			token: process.env.TINY_TKN!,
		}
	},
	zuma: {
		token: process.env.ZUMA_TKN!,
	},
	emails: {
		info: {
			user: process.env.EMAIL_FIT_INFO_USER!,
			pass: process.env.EMAIL_FIT_INFO_PASS!,
		}
	}
}

console.log('Config loaded successfully')