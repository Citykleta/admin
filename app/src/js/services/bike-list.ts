import {service as api} from './api';
import {BikesService, BikeEntity} from 'citykleta';
import {provider} from './listable';

export const factory = provider<BikesService, BikeEntity>(api.Bikes());

export const service = factory();
