"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
exports.createPostSchema = {
    body: fluent_json_schema_1.default.object().prop('content', fluent_json_schema_1.default.string().required()),
    queryString: fluent_json_schema_1.default.object(),
    params: fluent_json_schema_1.default.object(),
    headers: fluent_json_schema_1.default.object(),
};
