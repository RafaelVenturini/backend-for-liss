import { Coupon } from "@api/tiendanube/interfaces.js";
import { appConfig } from "@config";

interface Opt {
  headers: {
    "Content-Type": string;
    Authentication: string;
    "User-Agent": string;
  };
  method: string;
  body: any | null;
}

const url = "https://api.tiendanube.com/v1/4820240/coupons";
const opt: Opt = {
  headers: appConfig.nuvemshop.headers,
  method: "",
  body: null,
};

interface CouponItens {
  couponCode: string;
  discount: string;
  startDate: string;
  vality: Date;
}

function formatBody(couponItens: CouponItens) {
  return JSON.stringify({
    code: couponItens.couponCode,
    type: "absolute",
    value: Number(couponItens.discount),
    start_date: couponItens.startDate.split("T")[0],
    end_date: couponItens.vality.toISOString().split("T")[0],
    max_uses: 1,
  });
}

export async function getCoupon(id: number): Promise<Coupon[]> {
  opt.method = "GET";
  opt.body = null;
  const resp = await fetch(`${url}?q=${id}`, opt);
  return await resp.json();
}

export async function createCoupon(couponItens: CouponItens) {
  opt.method = "POST";
  opt.body = formatBody(couponItens);

  console.log(opt);
  console.log(url);
  const resp = await fetch(url, opt);
  return resp.json();
}

export async function updateCoupon(id: number, couponItens: CouponItens) {
  opt.method = "PUT";
  opt.body = formatBody(couponItens);

  const resp = await fetch(`${url}/${id}`, opt);
  return resp.json();
}

export async function deleteCoupon(id: number) {
  opt.method = "DELETE";
  opt.body = null;
  const resp = await fetch(`${url}/${id}`, opt);
  return resp.json();
}

export async function clearCoupons() {
  opt.method = "GET";
  opt.body = null;
  const resp = await fetch(`${url}?status=deactivated&per_page=200`, opt);
  const data: Coupon[] = await resp.json();
  let count = 0;

  for (const coupon of data) {
    await deleteCoupon(coupon.id);
    count++;
  }
  return count;
}
