"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.createPost = void 0;
const utils_1 = require("../helpers/utils");
const constants_1 = require("../helpers/constants");
const errors_1 = require("../helpers/errors");
const createPost = async (request, reply) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, email } = request['authUser'];
        const { content } = request.body;
        const post = await utils_1.prisma.post.create({
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
        reply.status(constants_1.STANDARD.SUCCESS).send({ data: post });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.createPost = createPost;
const getPosts = async (request, reply) => {
    try {
        const posts = await utils_1.prisma.post.findMany({
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
        reply.status(constants_1.STANDARD.SUCCESS).send({ data: posts });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.getPosts = getPosts;
