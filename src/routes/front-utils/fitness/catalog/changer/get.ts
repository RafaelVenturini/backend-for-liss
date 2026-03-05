import {RouteHandlerMethod} from "fastify";
import {skuWithoutColor} from "@/lib/string/sku-creation.js";

interface Changer {
    sku: string;
    name: string;
    price: number;
    sale: number;
    priority: number;
    colors: Color[];
}

interface Color {
    id: number;
    color: string;
    stock: boolean;
    newer: boolean;
    reposition: boolean;
    highlight: boolean;
    img: string;
}

const getChanger: RouteHandlerMethod = async (request, reply) => {
    const products =
        await request.server.db.fitness.changer.select("catalogo");

    let changer: Changer[] = [];
    products.forEach((product) => {
        const color = product.cor.replace(/Bicolor|Tricolor/, "").trim();
        const conjName = product.name.replace(color, "").trim();

        const colorProps = {
            id: product.prod_id,
            color: product.cor,
            stock: product.estoque,
            newer: product.novidade,
            reposition: product.reposicao,
            highlight: product.destaque,
            img: JSON.parse(product.img)[0],
        };

        const sku = skuWithoutColor(product.sku, product.name);

        const idx = changer.findIndex((x) => x.sku === sku && x.name === conjName);
        if (idx < 0) {
            changer.push({
                sku,
                name: conjName,
                price: Number(product.preco),
                sale: Number(product.promocao),
                priority: product.prioridade,
                colors: [colorProps],
            });
        } else {
            changer[idx].colors.push(colorProps);
            if (changer[idx].priority < product.prioridade)
                changer[idx].priority = product.prioridade;
            if (colorProps.newer) changer[idx].priority = 6;
            if (changer[idx].sale > Number(product.promocao))
                changer[idx].sale = Number(product.promocao);
        }
    });
    return reply.status(200).send({data: changer});
};

export default getChanger;
