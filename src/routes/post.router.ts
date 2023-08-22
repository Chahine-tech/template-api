import { FastifyInstance } from 'fastify';
import { createPostSchema } from '../schema';
import * as controllers from '../controllers';
import { checkValidRequest, checkValidUser } from '../helpers/auth';

export async function postRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '');
  fastify.route({
    method: 'POST',
    url: '/create',
    schema: createPostSchema,
    preHandler: [checkValidRequest, checkValidUser] as never,
    handler: controllers.createPost as never,
  });
  fastify.route({
    method: 'GET',
    url: '/',
    handler: controllers.getPosts,
  });
}
