import './config.js'
import fastify from "fastify";
import {registerRoutes} from "./routes/index.js";
import database from "@plugins/database.js";

export function buildApp() {
	const app = fastify({logger: true});
	
	app.register(database)
	registerRoutes(app)
	return app
}