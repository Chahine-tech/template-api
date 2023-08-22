import { Prisma, User } from '@prisma/client';
import { FastifyRequest } from 'fastify';

export interface IUserRequest extends FastifyRequest {
  body: Prisma.UserCreateInput;
  authUser: User;
}

export interface PostRequestBody extends FastifyRequest {
  content: string;
  authUser: User;
}
