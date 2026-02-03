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

    app.log.info('Testando conectividade SMTP...');

    // Testa DNS
    const dns = require('dns').promises;
    try {
        const addresses = await dns.resolve4('smtp.hostinger.com');
        app.log.info('DNS Hostinger OK:', addresses);
    } catch (err) {
        app.log.error('DNS Hostinger FALHOU:', err);
    }

    try {
        const addresses = await dns.resolve4('smtp.ethereal.email');
        app.log.info('DNS Ethereal OK:', addresses);
    } catch (err) {
        app.log.error('DNS Ethereal FALHOU:', err);
    }

    // Testa conexão TCP bruta
    const net = require('net');
    const testConnection = (host: string, port: number) => {
        return new Promise((resolve, reject) => {
            const socket = net.createConnection({host, port, timeout: 5000});
            socket.on('connect', () => {
                app.log.info(`Conexão TCP ${host}:${port} OK`);
                socket.destroy();
                resolve(true);
            });
            socket.on('error', (err) => {
                app.log.error(`Conexão TCP ${host}:${port} FALHOU:`, err);
                reject(err);
            });
            socket.on('timeout', () => {
                app.log.error(`Conexão TCP ${host}:${port} TIMEOUT`);
                socket.destroy();
                reject(new Error('timeout'));
            });
        });
    };

    try {
        await testConnection('smtp.hostinger.com', 587);
    } catch {
    }

    try {
        await testConnection('smtp.ethereal.email', 587);
    } catch {
    }


    verifyAllTransporters().catch(err => {
        app.log.error(`Error while verifying transporters`, err);
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