import nodemailer from "nodemailer";
import {fitnessMailer, testMailer} from "@emails/emails.js";

const config = {
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
}

export const transporters = {
    fitness: nodemailer.createTransport({...fitnessMailer, ...config}),
    test: nodemailer.createTransport({...testMailer, ...config}),
}