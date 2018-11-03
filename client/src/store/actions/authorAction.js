import { SAVE_AUTHOR } from './types';

export const saveAuthor = (author) => ({
    type: SAVE_AUTHOR,
    payload: { author }
})