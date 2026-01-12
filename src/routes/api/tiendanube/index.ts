import {FastifyPluginAsync} from "fastify";

import couponRoutes from "@routes/api/tiendanube/coupon/index.js";

const apiTiendanubeRoutes: FastifyPluginAsync = async (app) => {
	app.register(couponRoutes, {prefix: '/coupon'})
}

export default apiTiendanubeRoutes;