import {sdk} from 'citykleta';
import * as fetch from 'node-fetch';
import {URL} from 'url';

// todo get url from conf;
export default sdk(fetch, URL, (string) => Buffer.from(string).toString('base64'))({
    url: 'http://localhost:3000'
});
