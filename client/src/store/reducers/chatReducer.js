import { SAVE_AUTHOR, CLEAR_TEXT_INPUT, SAVE_MESSAGES, DELETE_AUTHOR } from '../actions/types';

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
        case SAVE_AUTHOR:
            return {
                ...state,
                author: action.payload
            };
        case CLEAR_TEXT_INPUT: 
            return {
                ...state,
                message: ''
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