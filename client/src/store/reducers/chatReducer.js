import { SAVE_AUTHOR, SAVE_MESSAGES, DELETE_AUTHOR, DELETE_MESSAGE } from '../actions/types';

const initialState = {
    author: '',
    message: '',
    messages: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        case SAVE_AUTHOR:
            return {
                ...state,
                author: action.payload
            };
        case DELETE_AUTHOR:
            return {
                ...state,
                author: ''
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
}