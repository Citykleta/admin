import {configuration as apiConf} from './api.js';
import {configuration as serverConf} from './server';

Object.freeze(apiConf);
Object.freeze(serverConf);

export const api = apiConf;
export const server = serverConf;
