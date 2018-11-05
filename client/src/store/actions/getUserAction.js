import { GET_USER } from './types';

export const getUser = (user) => ({
    type: GET_USER,
    payload: { user }
})