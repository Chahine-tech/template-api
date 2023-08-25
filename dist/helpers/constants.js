"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR400 = exports.ERROR409 = exports.ERROR500 = exports.ERROR401 = exports.ERROR403 = exports.ERROR404 = exports.STANDARD = void 0;
exports.STANDARD = {
    CREATED: 201,
    SUCCESS: 200,
    NOCONTENT: 204,
};
exports.ERROR404 = {
    statusCode: 404,
    message: 'NOT_FOUND',
};
exports.ERROR403 = {
    statusCode: 403,
    message: 'FORBIDDEN_ACCESS',
};
exports.ERROR401 = {
    statusCode: 401,
    message: 'UNAUTHORIZED',
};
exports.ERROR500 = {
    statusCode: 500,
    message: 'TRY_AGAIN',
};
exports.ERROR409 = {
    statusCode: 409,
    message: 'DUPLICATE_FOUND',
};
exports.ERROR400 = {
    statusCode: 400,
    message: 'BAD_REQUEST',
};
