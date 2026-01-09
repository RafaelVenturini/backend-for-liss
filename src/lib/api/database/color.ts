import {ClothsResult} from "@plugins/interface.js";
import {colorPicker} from "@/lib/string/products.js";

export async function createNewColor(name: string, sku: string, db: any) {
	const cloths = (await db.selectFitnessCloths()) as ClothsResult[]
	const color = colorPicker(cloths, name)
	return await db.insertFitnessColor(color, sku)
}