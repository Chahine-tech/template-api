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
exports.register = exports.login = void 0;
const utils_1 = require("../helpers/utils");
const errors_1 = require("../helpers/errors");
const JWT = __importStar(require("jsonwebtoken"));
const constants_1 = require("../helpers/constants");
const login = async (request, reply) => {
    try {
        const { email, password } = request.body;
        const user = await utils_1.prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            reply.code(constants_1.ERROR400.statusCode).send(errors_1.ERRORS.userNotExists);
            return;
        }
        const isMatch = await (0, utils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            reply.code(constants_1.ERROR400.statusCode).send(errors_1.ERRORS.userCredError);
        }
        const token = JWT.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET);
        reply.code(constants_1.STANDARD.SUCCESS).send({
            token,
            user,
        });
    }
    catch (err) {
        (0, errors_1.handleServerError)(reply, err);
    }
};
exports.login = login;
const register = async (request, reply) => {
    try {
        const { email, password, firstName, lastName } = request.body;
        const user = await utils_1.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            reply.code(409).send(errors_1.ERRORS.userExists);
        }
        const hashPass = await (0, utils_1.hashPassword)(password);
        const createUser = await utils_1.prisma.user.create({
            data: {
                email,
                password: hashPass,
                firstName,
                lastName,
            },
        });
        const token = JWT.sign({
            id: createUser.id,
            email: createUser.email,
        }, process.env.JWT_SECRET);
        const userWithoutPassword = {
            id: createUser.id,
            email: createUser.email,
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            createdAt: createUser.createdAt,
            updatedAt: createUser.updatedAt,
        };
        reply.code(constants_1.STANDARD.SUCCESS).send({
            token,
            user: userWithoutPassword,
        });
    }
    catch (err) {
        (0, errors_1.handleServerError)(reply, err);
    }
};
exports.register = register;
