import {appConfig} from "@config";

export interface Mailer {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string,
    },
}


export const testMailer = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "lilian.bernier69@ethereal.email",
        pass: "v9B65XvD1wmDakX2gX",
    },
}

const mainHost = 'smtp.hostinger.com'
export const fitnessMailer = {
    host: mainHost,
    port: 587,
    secure: false,
    auth: {
        user: appConfig.emails.info.user,
        pass: appConfig.emails.info.pass,
    },
    tls: {
        rejectUnauthorized: false
    }
}

