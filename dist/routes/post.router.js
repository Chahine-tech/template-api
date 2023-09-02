"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const schema_1 = require("../schema");
const controllers = __importStar(require("../controllers"));
const auth_1 = require("../helpers/auth");
async function postRouter(fastify) {
    fastify.decorateRequest('authUser', '');
    fastify.route({
        method: 'POST',
        url: '/create',
        schema: schema_1.createPostSchema,
        preHandler: [auth_1.checkValidRequest, auth_1.checkValidUser],
        handler: controllers.createPost,
    });
    fastify.route({
        method: 'GET',
        url: '/',
        handler: controllers.getPosts,
    });
}
exports.postRouter = postRouter;
