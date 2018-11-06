import { App } from './app';
const app = App();
app.on('/login', () => import('./views/login.js'));
app.on('/users', () => import('./views/users.js'));
app.on('/bikes', () => import('./views/bikes.js'));
// app.on('/clients/:id', params => import('./views/client-details.js'));
app.boot();
console.log('Booted');
