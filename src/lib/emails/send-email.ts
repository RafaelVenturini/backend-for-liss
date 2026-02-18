import path from "path";
import fs from "fs";
import handlebars from "handlebars";

type FromOptions = "fitness" | "fashion" | "test"

interface N8nResponse {
    accepted: string[],
    rejected: string[],
    ehlo: string[],
    envelopeTime: number,
    messageTime: number,
    messageSize: number,
    response: string,
    envelope: {
        from: string,
        to: string[],
    },
    messageId: string
}


export async function sendEmail(templateName: string, subject: string, to: string, data: any, from: FromOptions): Promise<N8nResponse> {
    const filePath = path.join(process.cwd(), 'src', 'templates', 'emails', `${templateName}.html`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const template = handlebars.compile(source);
    const html = template(data);


    const opt = {
        method: 'POST',
        body: JSON.stringify({html, subject, to, from}),
    }

    // const url = appConfig.env === "prod" ? "https://n8n.ialiss.com.br/webhook/send/email" : "https://n8n.ialiss.com.br/webhook-test/send/email"
    const url = "https://n8n.ialiss.com.br/webhook/send/email"

    const sent = await fetch(url, opt)
    return await sent.json()
}