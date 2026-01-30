import "dotenv/config";
import {S3Client} from "@aws-sdk/client-s3";

const required = [
    "DB_HOST",
    "DB_PORT",
    "DB_FIT_USER",
    "DB_FIT_SHEMA",
    "DB_FIT_PASSW",
    "DB_FAS_USER",
    "DB_FAS_SHEMA",
    "DB_FAS_PASSW",
    "DB_TOO_USER",
    "DB_TOO_SHEMA",
    "DB_TOO_PASSW",
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
