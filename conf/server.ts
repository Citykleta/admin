export interface ServerConfiguration {
    port: number;
    hostname: string;
    protocol: string;
    keys: string[];
}

export const configuration: ServerConfiguration = {
    port: 3001,
    hostname: 'localhost',
    protocol: 'http',
    keys: ['foo', 'bar', 'bim']
};
