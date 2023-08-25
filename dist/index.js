"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const utils_1 = require("./helpers/utils");
const routes_1 = require("./routes");
const start = async () => {
    app_1.default.get('/', async (request, reply) => {
        reply.send({ name: 'My api' });
    });
    app_1.default.register(routes_1.userRouter, { prefix: '/api/user' });
    app_1.default.register(routes_1.postRouter, { prefix: '/api/post' });
    app_1.default.get('/health-check', async (request, reply) => {
        try {
            await (0, utils_1.healthCheck)();
            reply.status(200).send();
        }
        catch (e) {
            reply.status(500).send();
        }
    });
    app_1.default.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address} 🚀`);
    });
};
start();
