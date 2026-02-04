import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer} from "@emails/emails.js";
import {TransporterKey, transporters, transportersStatus} from "@emails/transporters.js";
import {checkConnection} from "@emails/verify.js";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {

    Object.keys(transporters).forEach(trans => {
        checkConnection(trans).catch(err => {
            console.error(`Falha ao conectar SMTP ${trans}:`, err);
        });
    });

    const sendEmail = async (templateName: string, subject: string, to: string, data: any, sender: TransporterKey) => {
        if (transportersStatus[sender] !== "ok") {
            console.log(`Reconectando SMTP ${sender}...`);
            await checkConnection(sender);

            // @ts-ignore
            if (transportersStatus[sender] !== "ok") {
                throw new Error(`SMTP ${sender} indisponível`);
            }
        }
        const filePath = path.join(process.cwd(), 'src', 'templates', 'emails', `${templateName}.html`);
        const source = fs.readFileSync(filePath, 'utf-8');
        const template = handlebars.compile(source);
        const html = template(data);

        return transporters[sender].sendMail({
            from: `"Liss Fitness" <${fitnessMailer.auth.user}>`,
            to,
            subject,
            html
        });
    };

    app.decorate('mailer', {send: sendEmail, status: transportersStatus});
};


export default fp(mailerPlugin);