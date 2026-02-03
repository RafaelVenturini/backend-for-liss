import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer} from "@emails/emails.js";
import {smtpStatus, TransporterKey} from "@emails/smtp-status.js";
import {verifyAllTransporters} from "@emails/verify.js";
import {transporters} from "@emails/transporters.js";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
    setImmediate(() => {
        verifyAllTransporters()
    })
    app.decorate("smtpStatus", smtpStatus)

    const sendEmail = async (templateName: string, subject: string, to: string, data: any, account: TransporterKey) => {
        const filePath = path.join(process.cwd(), 'src', 'templates', 'emails', `${templateName}.html`);
        const source = fs.readFileSync(filePath, 'utf-8');
        const template = handlebars.compile(source);
        const html = template(data);

        return transporters[account].sendMail({
            from: `"Liss Fitness" <${fitnessMailer.auth.user}>`,
            to,
            subject,
            html
        });
    };

    app.decorate('mailer', {send: sendEmail});
};


export default fp(mailerPlugin);