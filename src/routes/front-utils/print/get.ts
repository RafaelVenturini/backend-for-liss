import {RouteHandlerMethod} from "fastify";
import {appConfig} from "@config";
import {createCommand} from "@api/bucket/command.js";

const getPrint: RouteHandlerMethod = async (req, rep) => {
	const {print} = req.query as any;
	if (!print) return rep.status(400).send({error: 'Print is required'})
	try {
		const command = createCommand(`catalogs/fashion/prints/${print}.webp`);
		const response = await appConfig.buckets.public.publicBucket.send(command)
		
		rep.header('Content-Type', response.ContentType || 'image/webp');
		rep.header('Cache-Control', 'public, max-age=31536000, immutable');
		
		return rep.send(response.Body);
		
	} catch (error) {
		console.log(error);
		rep.status(404).send('Estampa não encontrada');
	}
}

export default getPrint;