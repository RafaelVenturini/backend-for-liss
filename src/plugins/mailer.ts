import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer, testMailer} from "@emails/emails.js";
import {appConfig} from "@config";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	let transporter
		if(appConfig.env === 'prod') transporter = nodemailer.createTransport(fitnessMailer);
		else transporter = nodemailer.createTransport(testMailer);
	
	const checkConnection = async (attempts = 0) => {
		try {
			await transporter.verify();
			app.log.info('SMTP Conectado e pronto para uso.');
		} catch (err: any) {
			app.log.error(`Erro SMTP (Tentativa ${attempts + 1}): ${err.message}`);
			// Tenta novamente em 30 segundos se falhar
			if (attempts < 5) {
				setTimeout(() => checkConnection(attempts + 1), 30000);
			}
		}
	};
	
	checkConnection();
	
	// try {
	// 	await transporter.verify();
	//
	// } catch (e) {
	// 	console.log(e);
	// }
	
	const sendEmail = async (templateName: string, subject: string, to: string, data: any) => {
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