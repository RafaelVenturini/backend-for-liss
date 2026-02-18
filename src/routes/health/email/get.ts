import {RouteHandlerMethod} from "fastify";
import {toBLR} from "@/lib/string/money.js";
import {sendEmail} from "@emails/send-email.js";

const getEmailHealth: RouteHandlerMethod = async (_response, reply) => {
    const template = "new-coupon"
    const subject = "Cupom de cashback exclusivo!"
    const to = "rafaelventurinidipalma@gmail.com"
    const data = {
        discount: toBLR(420),
        coupon: "GalinhaDaArvore",
        vality: (new Date()).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const resp = await sendEmail(template, subject, to, data, "test")

    const code = resp.rejected.length === 0 ? 200 : 500
    
    reply.status(code).send()
}

export default getEmailHealth
