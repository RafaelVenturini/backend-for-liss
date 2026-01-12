import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import {toBLR} from "@/lib/string/money.js";
import {normalDate} from "@/lib/string/date.js";

export function newCouponEmail(coupon: any, value: number, vality: Date) {
	const filePath = path.join(process.cwd(), 'src', 'templates', 'emails', 'new-coupon.html')
	const source = fs.readFileSync(filePath, 'utf8')
	const template = handlebars.compile(source)
	return template({
		coupon,
		value: toBLR(value),
		vality: normalDate(vality)
	})
}