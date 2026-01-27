import { RouteHandlerMethod } from "fastify";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "@api/tiendanube/coupon.js";
import { cashBack, cashbackValityDays } from "@/lib/util/busines-rules.js";
import { calculateDate } from "@/lib/string/date.js";
import { error } from "node:console";

const postCoupon: RouteHandlerMethod = async (request, reply) => {
  const { customer, order, value, startDate, event } = request.body as any;
  const couponCode = `CB${customer}${order}`;
  const discount = (value * cashBack).toFixed(2);

  const vality = calculateDate(new Date(startDate), cashbackValityDays);

  const couponItens = {
    couponCode,
    discount,
    startDate,
    vality,
  };
  let couponSearch;
  let couponId;

  switch (event) {
    case "order/created":
      const response = await createCoupon(couponItens);
      if (response.code > 300) {
        return reply.status(500).send({ error: JSON.stringify(response) });
      }
      return reply.status(201).send({ data: { couponItens, response } });
    case "order/cancelled":
      couponSearch = await getCoupon(order);
      if (!couponSearch[0])
        return reply.status(404).send({ error: "Coupon not found" });
      couponId = couponSearch[0].id;
      if (!couponId)
        return reply.status(404).send({ error: "Coupon not found" });
      await deleteCoupon(couponId);
      return reply.status(204).send({ data: "Coupon deleted successfully" });
    case "order/updated":
    case "order/edited":
      couponSearch = await getCoupon(order);
      couponId = couponSearch[0].id;
      if (!couponId)
        return reply.status(404).send({ error: "Coupon not found" });
      const resp = await updateCoupon(couponId, couponItens);
      if (!resp) return reply.status(404).send({ error: "Coupon not found" });
      return reply.status(201).send({ data: resp });
    default:
      return reply.status(204).send({ data: "No action" });
  }
};

export default postCoupon;
