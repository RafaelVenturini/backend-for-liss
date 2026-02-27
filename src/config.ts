import "dotenv/config";
import {S3Client} from "@aws-sdk/client-s3";

const required = [
    "DB_MYSQL_ADM_PASSW",
    "DB_MYSQL_ADM_USER",
    "DB_MYSQL_HOST",
    "DB_MYSQL_PORT",
    "DB_MYSQL_SCHEMA_FAS",
    "DB_MYSQL_SCHEMA_FIT",
    "DB_MYSQL_SCHEMA_TOO",
    "NVSHP_AUTH",
    "NVSHP_USER",
    "NVSHP_SHOP",
    "TINY_FIT_TKN",
    "TINY_FAS_TKN",
    "ZUMA_LOGIN",
    "ZUMA_PASSW",
    "RAIL_WORKSPACE_TKN",
    "RAIL_PRODUCTION_TKN",
    "RAIL_PROJECT_ID",
    "EMAIL_FIT_INFO_USER",
    "EMAIL_FIT_INFO_PASS",
    "NODE_ENV",
    "BUCK_URL",
    "BUCK_REGION",
    "BUCK_PUB_NAME",
    "BUCK_PUB_ACCESS_ID",
    "BUCK_PUB_ACCESS_KEY",
];

for (const key of required) {
    if (!process.env[key]) throw new Error(`Missing env var ${key}`);
}

const publicBucket = new S3Client({
    endpoint: process.env.BUCK_URL!,
    region: process.env.BUCK_REGION!,
    credentials: {
        accessKeyId: process.env.BUCK_PUB_ACCESS_ID!,
        secretAccessKey: process.env.BUCK_PUB_ACCESS_KEY!,
    },
});

const db_user = process.env.DB_MYSQL_ADM_USER!;
const db_pass = process.env.DB_MYSQL_ADM_PASSW!;
const db_host = process.env.DB_MYSQL_HOST!;
const db_port = process.env.DB_MYSQL_PORT!;

console.log(
    db_user,
    db_pass,
    db_host,
    db_port,
    process.env.DB_MYSQL_SCHEMA_FIT,
    process.env.DB_MYSQL_SCHEMA_FAS,
    process.env.DB_MYSQL_SCHEMA_TOO
)

export const appConfig = {
    databases: {
        fitness: {
            host: db_host,
            port: Number(db_port),
            user: db_user,
            database: process.env.DB_MYSQL_SCHEMA_FIT!,
            password: db_pass,
        },
        fashion: {
            host: db_host,
            port: Number(db_port),
            user: db_user,
            database: process.env.DB_MYSQL_SCHEMA_FAS!,
            password: db_pass,
        },
        tools: {
            host: db_host,
            port: Number(db_port),
            user: db_user,
            database: process.env.DB_MYSQL_SCHEMA_TOO!,
            password: db_pass,
        },
    },
    nuvemshop: {
        headers: {
            "Content-Type": "application/json",
            Authentication: process.env.NVSHP_AUTH!,
            "User-Agent": process.env.NVSHP_USER!,
        },
        shopId: process.env.NVSHP_SHOP!,
    },
    tiny: {
        v2: {
            token: process.env.TINY_FIT_TKN!,
        },
    },
    zuma: {
        email: process.env.ZUMA_LOGIN,
        password: process.env.ZUMA_PASSW,
        token: "",
    },
    emails: {
        info: {
            user: process.env.EMAIL_FIT_INFO_USER!,
            pass: process.env.EMAIL_FIT_INFO_PASS!,
        },
    },
    buckets: {
        data: {
            name: process.env.BUCK_PUB_NAME!,
            url: process.env.BUCK_URL!,
            region: process.env.BUCK_REGION!,
        },
        public: {publicBucket},
    },
    env: process.env.NODE_ENV,
};

console.log("Config loaded successfully");
