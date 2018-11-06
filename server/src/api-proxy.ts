import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as body from 'koa-bodyparser';
import * as jsonSchema from 'koa-json-schema';
import {default as sdk} from './sdk';
import {api} from '../../conf';

const app = new Koa();
const router = new Router();

// API error handler
router.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.status = e.status || 500;
        ctx.body = e.message || 'Internal Server error';
    }
});

router.use(async (ctx, next) => {
    const type = ctx.is('application/json', 'text');
    if ((ctx.method === 'PUT' || ctx.method === 'POST') && !type) {
        return ctx.throw(415);
    }
    await next();
});

const createTokenSchema = {
    properties: {
        username: {type: 'string', format: 'email'},
        password: {type: 'string'}
    },
    required: ['username', 'password']
};

// Create token and save it into session
router.post('/tokens',
    body(),
    jsonSchema(createTokenSchema),
    async (ctx, next) => {
        const {Tokens, Users} = sdk;
        const token = await Tokens({clientId: api.id, secret: api.secret})
            .create(ctx.request.body);
        ctx.session.token = token;
        ctx.body = await Users({token: token.access_token})
            .one(token.user_id);
    });

// Get token from session
router.use(async (ctx, next) => {
    const {token} = ctx.session;
    if (!token) {
        return ctx.throw(401, {message: 'Unauthenticated user'});
    }
    await next();
});

router.get('/bikes', async (ctx, next) => {
    const {Bikes} = sdk;
    ctx.body = await Bikes({
        token: ctx.session.token.access_token
    }).list(ctx.query);
});

router.get('/bikes/:id', async (ctx, next) => {
    const {Bikes} = sdk;
    ctx.body = await Bikes({
        token: ctx.session.token.access_token
    }).one(ctx.params.id);
});

router.get('/businesses', async (ctx, next) => {
    const {Businesses} = sdk;
    ctx.body = await Businesses({
        token: ctx.session.token.access_token
    }).list(ctx.query);
});

router.get('/businesses/:id', async (ctx, next) => {
    const {Businesses} = sdk;
    ctx.body = await Businesses({
        token: ctx.session.token.access_token
    }).one(ctx.params.id);
});

router.get('/users', async (ctx, next) => {
    const {Users} = sdk;
    ctx.body = await Users({
        token: ctx.session.token.access_token
    }).list(ctx.query);
});

router.get('/users/me', async (ctx, next) => {
    const {Users} = sdk;
    const {token} = ctx.session;
    const {access_token, user_id} = token;
    ctx.body = await Users({token: access_token})
        .one(user_id);
});

router.get('users/:id', async (ctx, next) => {
    const {Users} = sdk;
    const {token} = ctx.session;
    const {access_token} = token;
    ctx.body = await Users({token: access_token})
        .one(ctx.params.id);
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
