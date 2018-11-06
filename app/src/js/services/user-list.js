import { service as api } from './api';
import { provider } from './listable';
export const factory = provider(api.Users());
export const service = factory();
