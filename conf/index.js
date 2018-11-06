"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_js_1 = require("./api.js");
const server_1 = require("./server");
Object.freeze(api_js_1.configuration);
Object.freeze(server_1.configuration);
exports.api = api_js_1.configuration;
exports.server = server_1.configuration;
