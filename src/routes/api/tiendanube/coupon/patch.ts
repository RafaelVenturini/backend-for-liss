import {RouteHandlerMethod} from "fastify";
import {clearCoupons} from "@api/tiendanube/coupon.js";

const patchCoupon: RouteHandlerMethod = async (request, reply) => {
	const removed = await clearCoupons()
	return reply.status(200).send({removed})
}

export default patchCoupon;