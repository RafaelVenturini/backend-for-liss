import nodemailer from "nodemailer";
import {fitnessMailer, testMailer} from "@emails/emails.js";

const config = {
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
}

export const transporters = {
    fitness: nodemailer.createTransport({...fitnessMailer, ...config}),
    test: nodemailer.createTransport({...testMailer, ...config}),
}