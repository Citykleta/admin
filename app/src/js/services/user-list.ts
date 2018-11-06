import {service as api} from './api';
import {UserEntity, UsersService} from 'citykleta';
import {provider} from './listable';

export const factory = provider<UsersService, UserEntity>(api.Users());

export const service = factory();
