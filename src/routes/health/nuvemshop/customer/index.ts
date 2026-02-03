import {FastifyPluginAsync} from "fastify";
import getCustomerHealth from "@routes/health/nuvemshop/customer/get.js";
import {HealthSchema} from "@routes/health/schema.js";

const customerHealthRoutes: FastifyPluginAsync = async (app) => {
    app.get('', {schema: HealthSchema}, getCustomerHealth)
}

export default customerHealthRoutes;