import { sdk, parseResponse } from 'citykleta';
// Singleton (todo should come from config)
const serviceInstance = sdk(window.fetch, window.URL, window.btoa)({ url: 'http://localhost:3001/api/' });
const { Users } = serviceInstance;
const extendedUsers = (opts = { token: '' }) => {
    return Object.assign(Users(opts), {
        async me() {
            const url = new URL(this.url);
            url.pathname += 'users/me';
            const response = await fetch(url.href, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return parseResponse(response);
        }
    });
};
serviceInstance.Users = extendedUsers;
export const service = serviceInstance;
