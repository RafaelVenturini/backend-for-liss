import path from "path";

export const fastifyStaticOpts = {root: path.join(process.cwd(), 'uploads'), prefix: '/img/'}