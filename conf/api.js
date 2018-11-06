"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    id: process.env.APPLICATION_ID || '6a908152-60e8-489f-b2c6-bd757ca2165b',
    secret: process.env.APPLICATION_SECRET || 'foo'
};
