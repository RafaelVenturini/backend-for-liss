import {RouteHandlerMethod} from "fastify";

const postTest: RouteHandlerMethod = async (request, reply) => {

    const changes = {priority: 1, sale: 1};

    await request.server.db.fitness.changer.updateProduct({changes, id: 'LCL-DOR-JZT-TU-', table: "catalogo"});
}

export default postTest;