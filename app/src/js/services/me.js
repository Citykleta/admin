import { service as api } from './api';
export const factory = () => {
    let currentUser = null;
    return {
        async get() {
            if (!currentUser) {
                this.set(await api.Users().me());
            }
            return currentUser;
        },
        set(user) {
            currentUser = user;
        }
    };
};
export const service = factory();
