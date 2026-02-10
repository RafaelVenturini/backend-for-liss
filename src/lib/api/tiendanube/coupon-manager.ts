import {Order} from "@api/tiendanube/interfaces.js";
import {calculateDate} from "@/lib/string/date.js";
import {cashBack, cashbackValityDays} from "@/lib/util/busines-rules.js";
import {createCoupon, deleteCoupon, getCoupon, updateCoupon} from "@api/tiendanube/coupon.js";
import {toBLR} from "@/lib/string/money.js";
import {ArrangedCustomer} from "@api/tiendanube/arrange-order.js";
import {sendEmail} from "@emails/send-email.js";

interface Config {
    data: Order,
    event: string,
    customer: ArrangedCustomer
    test?: boolean
}

interface CouponItens {
    couponCode: string
    discount: string
    startDate: Date
    vality: Date
}

export async function couponManager({data, event, customer}: Config) {
    const customerName = data.customer.name.split(' ')[0]
    const orderNumber = data.number
    const couponCode = `CB${customerName}${orderNumber}`
    const discount = ((Number(data.total) - Number(data.shipping_cost_customer)) * cashBack).toFixed(2)
    const startDate = new Date()
    const vality = calculateDate(new Date(), cashbackValityDays)

    const couponItens: CouponItens = {
        couponCode,
        discount,
        startDate,
        vality,
    }

    let couponSearch
    let couponId

    const emailObject = {
        discount: toBLR(couponItens.discount),
        coupon: couponItens.couponCode,
        vality: (couponItens.vality).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    let template = ""
    let title = ""
    let status
    let resp: null | string | CouponItens

    switch (event) {
        case 'order/created':
            await createCoupon(couponItens)
            template = "new-coupon"
            title = "Cupom de cashback exclusivo!"
            status = 201
            resp = couponItens
            break;
        case 'order/cancelled':
            couponSearch = await getCoupon(orderNumber)
            if (!couponSearch[0]) {
                status = 404;
                resp = 'Coupon not found';
                break;
            }
            couponId = couponSearch[0].id
            if (!couponId) {
                status = 404;
                resp = 'Coupon not found';
                break;
            }
            await deleteCoupon(couponId)
            template = 'deleted-coupon'
            title = 'Cupom deletado por cancelamento de pedido'
            status = 204;
            resp = 'Coupon deleted successfully';
            break;
        case 'order/edited':
            couponSearch = await getCoupon(orderNumber)
            if (couponSearch.length === 0 || !couponSearch[0].id) {
                await createCoupon(couponItens)
                template = "new-coupon"
                title = "Cupom de cashback exclusivo!"
                status = 201
                resp = couponItens
                break
            }
            couponId = couponSearch[0].id
            const coupon = await updateCoupon(couponId, couponItens)
            if (!coupon) {
                status = 404;
                resp = 'Coupon not found'
            }
            status = 201;
            resp = coupon;
            break;
        default:
            status = 204;
            resp = "default case"
    }

    if (template) {
        await sendEmail(template,
            title,
            customer.email,
            emailObject,
            "fitness")
    }

    return {status, resp}
}