import {RouteHandlerMethod} from "fastify";
import {smtpStatus} from "@emails/smtp-status.js";

const getEmailHealth: RouteHandlerMethod = async (_request, reply) => {
    let code = 200


    if (smtpStatus.fitness === "error") code = 500
    if (smtpStatus.test === "error") code = 500

    reply.status(code).send({details: smtpStatus})
};

export default getEmailHealth;