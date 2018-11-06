export interface MetaInput {
    title?: string;
}

const defaultMeta = Object.freeze({
    title: 'Citykleta | Admin Panel'
});

export const meta = ({title = defaultMeta.title}: MetaInput = defaultMeta) => `
  <title>${title}</title>
    <meta charset="utf8" />
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
`;
