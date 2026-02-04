import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer, testMailer} from "@emails/emails.js";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
    const fitnessTrans = nodemailer.createTransport(fitnessMailer);
    const testTrans = nodemailer.createTransport(testMailer);

    const checkConnection = async (transporter: any, attempts = 0) => {
        if (!transporter) return
        
        const email = transporter?.transporter?.options?.auth?.user
        try {
            console.log("Conectando no email: ", email);
            await transporter.verify();
            app.log.info(`SMTP de ${email} Conectado e pronto para uso.`);
        } catch (err: any) {
            app.log.error(`Erro SMTP de ${email} (Tentativa ${attempts + 1}): ${err.message}`);
            if (attempts < 5) {
                setTimeout(() => checkConnection(attempts + 1), 30000);
            }
        }
    };

    checkConnection(fitnessTrans);
    checkConnection(testTrans);

    const sendEmail = async (templateName: string, subject: string, to: string, data: any, transporter: any) => {
        const filePath = path.join(process.cwd(), 'src', 'templates', 'emails', `${templateName}.html`);
        const source = fs.readFileSync(filePath, 'utf-8');
        const template = handlebars.compile(source);
        const html = template(data);

        return transporter.sendMail({
            from: `"Liss Fitness" <${fitnessMailer.auth.user}>`,
            to,
            subject,
            html
        });
    };

    app.decorate('mailer', {send: sendEmail});
};


export default fp(mailerPlugin);