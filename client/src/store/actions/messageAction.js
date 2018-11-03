import { SAVE_MESSAGES } from './types';

export const saveMessages = (messages) => ({
    type: SAVE_MESSAGES,
    payload: { messages }
})