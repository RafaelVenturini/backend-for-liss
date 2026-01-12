import {FastifyPluginAsync} from "fastify";
import patchCoupon from "@routes/api/tiendanube/coupon/patch.js";
import postCoupon from "@routes/api/tiendanube/coupon/post.js";
import {
	PatchCouponSchema,
	PostCouponSchema
} from "@routes/api/tiendanube/schemas.js";

const couponRoutes: FastifyPluginAsync = async (app) => {
	app.patch('/', {schema: PatchCouponSchema}, patchCoupon)
	app.post('/', {schema: PostCouponSchema}, postCoupon)
}

export default couponRoutes;