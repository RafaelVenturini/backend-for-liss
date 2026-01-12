import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {fitnessMailer} from "@emails/emails.js";

const mailerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
	const transporter = nodemailer.createTransport(fitnessMailer);
	try {
		await transporter.verify();
	} catch (e) {
		console.log(e);
	}
	
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