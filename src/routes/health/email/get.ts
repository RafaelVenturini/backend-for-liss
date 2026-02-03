import {RouteHandlerMethod} from "fastify";
import {smtpStatus} from "@emails/smtp-status.js";

const getEmailHealth: RouteHandlerMethod = async (_request, reply) => {
    console.log(smtpStatus)
    reply.status(200).send({details: smtpStatus})
};

export default getEmailHealth;