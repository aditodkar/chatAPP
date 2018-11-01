import {combineReducers} from 'redux';
import users from './loginReducer'

export default combineReducers({
    users: users
})
