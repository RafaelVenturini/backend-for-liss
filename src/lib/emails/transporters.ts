import nodemailer from "nodemailer";
import {fitnessMailer, testMailer} from "@emails/emails.js";

export const transporters = {
    fitness: nodemailer.createTransport(fitnessMailer),
    test: nodemailer.createTransport(testMailer),
}