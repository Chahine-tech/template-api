import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { prisma } from '../helpers/utils';
import { ERROR400, ERROR401 } from './constants';
import { IUserRequest } from '../interfaces/index';
import * as JWT from 'jsonwebtoken';

export const checkValidRequest = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  try {
    let token = request.headers.authorization;
    token = token?.replace('Bearer ', '') ?? '';
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      JWT.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
          return reply.code(ERROR400.statusCode).send(ERROR400);
        }
        done();
      });
    } else {
      return reply.code(ERROR400.statusCode).send(ERROR400);
    }
  } catch (e) {
    return reply.code(ERROR400.statusCode).send(ERROR400);
  }
};

export const checkValidUser = async (
  request: IUserRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  try {
    let token = request.headers.authorization;
    token = token?.replace('Bearer ', '') ?? '';

    if (!token) {
      return reply.code(ERROR401.statusCode).send(ERROR401);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = JWT.verify(token, process.env.JWT_SECRET as string);

    if (!user.id) {
      return reply.code(ERROR401.statusCode).send(ERROR401);
    }

    const userData = await prisma.user.findUnique({ where: { id: user.id } });

    if (!userData) {
      return reply.code(ERROR401.statusCode).send(ERROR401);
    }
    request.authUser = userData;
    done();
  } catch (e) {
    return reply.code(ERROR401.statusCode).send(e);
  }
};
