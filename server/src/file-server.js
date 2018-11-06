"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const serve = require("koa-static");
const app = new Koa();
app.use(serve('app/dist'));
exports.default = app;
