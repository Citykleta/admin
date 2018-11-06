"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const citykleta_1 = require("citykleta");
const fetch = require("node-fetch");
const url_1 = require("url");
// todo get url from conf;
exports.default = citykleta_1.sdk(fetch, url_1.URL, (string) => Buffer.from(string).toString('base64'))({
    url: 'http://localhost:3000'
});
