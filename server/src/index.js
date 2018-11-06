"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const session = require("koa-session");
const mount = require("koa-mount");
const compress = require("koa-compress");
const logger = require("koa-logger");
const Router = require("koa-router");
const skeleton_page_1 = require("./pages/skeleton-page");
const api_proxy_1 = require("./api-proxy");
const file_server_js_1 = require("./file-server.js");
const conf_1 = require("../../conf/");
const conf = {
    api: conf_1.api,
    server: conf_1.server
};
const app = new Koa();
app.keys = conf_1.server.keys;
app.use(logger());
app.use(compress());
app.use(mount('/public', file_server_js_1.default));
app.use(session(app)); // todo use a redis store
const router = new Router();
router.get('/logout', async (ctx, next) => {
    ctx.session = null;
    ctx.redirect('/login');
});
// Fall through: render skeleton app
const publicRegexp = /^\/public/;
const apiRegexp = /^\/api/;
router.get('*', async (ctx, next) => {
    console.log(ctx.path);
    if (!publicRegexp.test(ctx.path) && !apiRegexp.test(ctx.path) && ctx.path !== '/favicon.ico') {
        ctx.type = 'text/html';
        ctx.body = skeleton_page_1.page({});
    }
});
app.use(mount('/api', api_proxy_1.default));
app.use(router.routes());
app.listen(conf.server.port);
