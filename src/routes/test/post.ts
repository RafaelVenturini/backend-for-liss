import {RouteHandlerMethod} from "fastify";
import {PutBucketPolicyCommand} from "@aws-sdk/client-s3";
import {appConfig} from "@config";

const postTest: RouteHandlerMethod = async (request, reply) => {
	try {
		const bucketName = "ergonomic-carton-rpr6omyp";
		const policy = {
			Version: "2012-10-17",
			Statement: [
				{
					Effect: "Allow",
					Principal: "*",
					Action: "s3:GetObject",
					Resource: `arn:aws:s3:::${bucketName}/*`
				}
			]
		}
		
		const data = await appConfig.buckets.public.publicBucket.send(new PutBucketPolicyCommand({
			Bucket: bucketName,
			Policy: JSON.stringify(policy)
		}))
		return reply.status(201).send({data})
	} catch (e: any) {
		console.error("❌ Erro Detalhado:", {
			name: e.name,       // Ex: 'AccessDenied', 'InvalidRequest's
			message: e.message, // A mensagem explicativa
			code: e.Code,       // O código de erro do S3
			region: e.Region,
			fault: e.$fault     // Se o erro foi no 'client' ou 'server'
		});
		return reply.status(500).send({error: e})
	}
}

export default postTest;