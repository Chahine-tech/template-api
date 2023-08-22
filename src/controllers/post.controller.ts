import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../helpers/utils';
import { STANDARD } from '../helpers/constants';
import { handleServerError } from '../helpers/errors';
import { PostRequestBody } from '../interfaces';

export const createPost = async (
  request: PostRequestBody,
  reply: FastifyReply,
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, email } = request['authUser'];
    const { content } = request.body as PostRequestBody;
    const post = await prisma.post.create({
      data: {
        content: content,
        createdBy: {
          connect: {
            id: id,
          },
        },
        viewCount: 0,
      },
    });
    reply.status(STANDARD.SUCCESS).send({ data: post });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getPosts = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        createdBy: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    reply.status(STANDARD.SUCCESS).send({ data: posts });
  } catch (e) {
    handleServerError(reply, e);
  }
};
