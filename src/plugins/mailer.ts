import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer} from "@emails/emails.js";
import {TransporterKey, transporters, transportersStatus} from "@emails/transporters.js";
import {checkConnection} from "@emails/verify.js";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {

    const connectionChecks = Object.keys(transporters).map(key => checkConnection(key))
    await Promise.allSettled(connectionChecks);
    console.log("status de transporters: ", JSON.stringify(transportersStatus));

    const sendEmail = async (templateName: string, subject: string, to: string, data: any, sender: TransporterKey) => {
        if (transportersStatus[sender] !== "ok") {
            throw new Error(`Transporter ${sender} não está disponível`);
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