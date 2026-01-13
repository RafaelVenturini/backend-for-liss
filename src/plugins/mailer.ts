import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer} from "@emails/emails.js";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	const transporter = nodemailer.createTransport(fitnessMailer);
	
	const verifyPromise = transporter.verify();
	const timeoutPromise = new Promise((_, reject) =>
		setTimeout(() => reject(new Error('SMTP verify timeout')), 5000)
	);
	
	try {
		await Promise.race([verifyPromise, timeoutPromise]);
	} catch (error) {
		console.error('\n\n\n\nErro ao verificar o transporte de' +
			' e-mail:', error, '\n\n\n\n');
		// Não lance o erro, apenas logue
	}
	
	// try {
	// 	await transporter.verify();
	//
	// } catch (e) {
	// 	console.log(e);
	// }
	
	const sendEmail = async (templateName: string, subject: string, to: string, data: any) => {
		const filePath = path.join(process.cwd(), 'src/templates/emails', `${templateName}.html`);
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