import {FastifyPluginAsync} from "fastify";
import patchCache from "@routes/front-utils/fitness/catalog/cache/patch.js";
import {FitCatalogCacheSchema} from "@routes/front-utils/fitness/catalog/schema.js";


const cacheRoutes: FastifyPluginAsync = async (app) => {
    app.patch('/', {schema: FitCatalogCacheSchema}, patchCache)
}

export default cacheRoutes;