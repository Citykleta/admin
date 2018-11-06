import Navigo from 'navigo';
//todo load conf instead of hardcoded
export const factory = ({ root = 'http://localhost:3001' } = {}) => new Navigo(root);
// Singleton
export const service = factory();
