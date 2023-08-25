"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = exports.ERRORS = void 0;
const constants_1 = require("./constants");
exports.ERRORS = {
    invalidToken: new Error('Token is invalid.'),
    userExists: new Error('User already exists'),
    userNotExists: new Error('User not exists'),
    userCredError: new Error('Invalid credential'),
    tokenError: new Error('Invalid Token'),
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function handleServerError(reply, error) {
    return reply.status(constants_1.ERROR500.statusCode).send(constants_1.ERROR500);
}
exports.handleServerError = handleServerError;
