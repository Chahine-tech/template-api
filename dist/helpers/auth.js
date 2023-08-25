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
exports.checkValidUser = exports.checkValidRequest = void 0;
const utils_1 = require("../helpers/utils");
const constants_1 = require("./constants");
const JWT = __importStar(require("jsonwebtoken"));
const checkValidRequest = (request, reply, done) => {
    try {
        let token = request.headers.authorization;
        token = token?.replace('Bearer ', '') ?? '';
        if (token) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return reply.code(constants_1.ERROR400.statusCode).send(constants_1.ERROR400);
                }
                done();
            });
        }
        else {
            return reply.code(constants_1.ERROR400.statusCode).send(constants_1.ERROR400);
        }
    }
    catch (e) {
        return reply.code(constants_1.ERROR400.statusCode).send(constants_1.ERROR400);
    }
};
exports.checkValidRequest = checkValidRequest;
const checkValidUser = async (request, reply, done) => {
    try {
        let token = request.headers.authorization;
        token = token?.replace('Bearer ', '') ?? '';
        if (!token) {
            return reply.code(constants_1.ERROR401.statusCode).send(constants_1.ERROR401);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = JWT.verify(token, process.env.JWT_SECRET);
        if (!user.id) {
            return reply.code(constants_1.ERROR401.statusCode).send(constants_1.ERROR401);
        }
        const userData = await utils_1.prisma.user.findUnique({ where: { id: user.id } });
        if (!userData) {
            return reply.code(constants_1.ERROR401.statusCode).send(constants_1.ERROR401);
        }
        request.authUser = userData;
        done();
    }
    catch (e) {
        return reply.code(constants_1.ERROR401.statusCode).send(e);
    }
};
exports.checkValidUser = checkValidUser;
