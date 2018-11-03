import {combineReducers} from 'redux';
import users from './loginReducer'
import allusers from './userReducer'
import chatReducer from './chatReducer'

export default combineReducers({
    users: users,
    allusers: allusers,
    chat: chatReducer
})
