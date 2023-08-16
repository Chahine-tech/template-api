import { FastifyReply } from 'fastify';
import { IUserRequest } from '../interfaces';
import { comparePassword, hashPassword, prisma } from '../helpers/utils';
import { ERRORS, handleServerError } from '../helpers/errors';
import * as JWT from 'jsonwebtoken';
import { ERROR400, STANDARD } from '../helpers/constants';

export const login = async (request: IUserRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      reply.code(ERROR400.statusCode).send(ERRORS.userNotExists);
      return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      reply.code(ERROR400.statusCode).send(ERRORS.userCredError);
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
    );
    reply.code(STANDARD.SUCCESS).send({
      token,
      user,
    });
  } catch (err) {
    handleServerError(reply, err);
  }
};

export const register = async (request: IUserRequest, reply: FastifyReply) => {
  try {
    const { email, password, firstName, lastName } = request.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      reply.code(409).send(ERRORS.userExists);
    }

    const hashPass = await hashPassword(password);
    const createUser = await prisma.user.create({
      data: {
        email,
        password: hashPass,
        firstName,
        lastName,
      },
    });

    const token = JWT.sign(
      {
        id: createUser.id,
        email: createUser.email,
      },
      process.env.JWT_SECRET as string,
    );

    const userWithoutPassword = {
      id: createUser.id,
      email: createUser.email,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
    };

    reply.code(STANDARD.SUCCESS).send({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    handleServerError(reply, err);
  }
};
