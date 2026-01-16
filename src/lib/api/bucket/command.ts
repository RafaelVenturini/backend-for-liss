import {GetObjectCommand} from "@aws-sdk/client-s3";
import {appConfig} from "@config";

export function createCommand(key: string) {
	return new GetObjectCommand({
		Bucket: appConfig.buckets.data.name,
		Key: key
	})
	
}