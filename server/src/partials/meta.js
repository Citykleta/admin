"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultMeta = Object.freeze({
    title: 'Citykleta | Admin Panel'
});
exports.meta = ({ title = defaultMeta.title } = defaultMeta) => `
  <title>${title}</title>
    <meta charset="utf8" />
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
`;
