import {combineReducers} from 'redux';
import users from './loginReducer'
import allusers from './userReducer'

export default combineReducers({
    users: users,
    allusers: allusers
})
