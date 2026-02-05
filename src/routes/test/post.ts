import {RouteHandlerMethod} from "fastify";
import {sendEmail} from "@emails/send-email.js";
import {toBLR} from "@/lib/string/money.js";

const postTest: RouteHandlerMethod = async (_request, _reply) => {
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
    console.log(resp)
}

export default postTest;