import { SAVE_AUTHOR, SAVE_MESSAGES, DELETE_AUTHOR, REMOVE_MESSAGES } from '../actions/types';

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
                messages: [...state.messages, ...action.payload.messages]
            };
        case REMOVE_MESSAGES:
            return {
                ...state,
                messages: []
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
        default:
            return state;
    }
}