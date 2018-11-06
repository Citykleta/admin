import {ExtendedUsers, service as api} from './api';
import {UserEntity} from 'citykleta';


export const factory = () => {
    let currentUser: UserEntity = null;
    return {
        async get() {
            if (!currentUser) {
                this.set(await (api.Users() as ExtendedUsers).me());
            }
            return currentUser;
        },
        set(user: UserEntity) {
            currentUser = user;
        }
    };
};

export const service = factory();
