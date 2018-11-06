import * as Koa from 'koa';
import * as serve from 'koa-static';

const app = new Koa();
app.use(serve('app/dist'));

export default app;
