import nodemailer from "nodemailer";
import {fitnessMailer, testMailer} from "@emails/emails.js";
import {TransporterStatus} from "@emails/smtp-status.js";

export const transporters = {
    fitness: nodemailer.createTransport(fitnessMailer),
    test: nodemailer.createTransport(testMailer),
}

console.log('Configurações SMTP:', {
    fitness: {
        host: fitnessMailer.host,
        port: fitnessMailer.port,
        secure: fitnessMailer.secure
    },
    test: {
        host: testMailer.host,
        port: testMailer.port,
        secure: testMailer.secure
    }
});

export const transportersStatus: TransporterStatus = {
    fitness: "unknown",
    test: "unknown",
}

export type TransporterKey = keyof typeof transporters;

export function isTransporterKey(key: string): key is TransporterKey {
    return key in transporters;
}