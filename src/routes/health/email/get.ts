import {RouteHandlerMethod} from "fastify";
import {fitnessTrans, testTrans} from "@plugins/mailer.js";

interface TransporterStatus {
    fitness: string;
    test: string;
    fashion: string | null;
}

const getEmailHealth: RouteHandlerMethod = async (_request, reply) => {
    const transporters = [
        {trans: testTrans, label: 'test' as keyof TransporterStatus},
        {trans: fitnessTrans, label: 'fitness' as keyof TransporterStatus}
    ];

    const status: TransporterStatus = {
        fitness: "ok",
        test: "ok",
        fashion: null
    };

    for (const transporter of transporters) {
        try {
            await transporter.trans.verify();
        } catch (error) {
            status[transporter.label] = "error";
        }
    }

    const hasError = Object.values(status).some(
        value => value === "error"
    );

    if (hasError) {
        return reply.status(503).send({
            status: "unhealthy",
            details: status
        });
    }

    return reply.status(200).send({
        status: "healthy",
        details: status
    });
};

export default getEmailHealth;