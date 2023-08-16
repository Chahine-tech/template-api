import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { loginSchema, signupSchema } from "../schema";

export async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest("authUser", "");

  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: controllers.login as any,
  });

  fastify.route({
    method: "POST",
    url: "/signup",
    schema: signupSchema,
    handler: controllers.register as any,
  });
}
