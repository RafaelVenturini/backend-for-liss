import {RouteHandlerMethod} from "fastify";
import {smtpStatus} from "@emails/smtp-status.js";

const getEmailHealth: RouteHandlerMethod = async (_request, reply) => {
    const hasError = Object.values(smtpStatus).some(
        status => status !== "ok"
    );

    reply.status(hasError ? 503 : 200).send({
        status: hasError ? "unhealthy" : "healthy",
        details: smtpStatus
    });
};

export default getEmailHealth;