import nodemailer from 'nodemailer'

export async function sendEmail(mailer: any,from:string,to:string,subject:string,html:string) {
	const info = await mailer.sendMail({from, to, subject, html,});
	
	console.log("Info:", info);
}

export const testMailer = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: "lilian.bernier69@ethereal.email",
		pass: "v9B65XvD1wmDakX2gX",
	},
});

// await sendEmail(
// 	testMailer,
// 	'Lilian Bernier <lilian.bernier69@ethereal.email>',
// 	'rafaelventurinidipalma@gmail.com',
// 	'Test Email',
// 	'<h1>Hello from Ruffus!</h1><p>This is a test email.</p>'
// );