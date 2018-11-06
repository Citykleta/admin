import { service as api } from './api';
import { provider } from './listable';
export const factory = provider(api.Bikes());
export const service = factory();
