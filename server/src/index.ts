import * as Koa from 'koa';
import * as session from 'koa-session';
import * as mount from 'koa-mount';
import * as compress from 'koa-compress';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import {page as skeleton} from './pages/skeleton-page';
import apiProxy from './api-proxy';
import fileServer from './file-server.js';
import {api, server} from '../../conf/';

const conf = {
    api,
    server
};

const app = new Koa();

app.keys = server.keys;

app.use(logger());
app.use(compress());
app.use(mount('/public', fileServer));

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
        ctx.body = skeleton({});
    }
});

app.use(mount('/api', apiProxy));
app.use(router.routes());

app.listen(conf.server.port);
