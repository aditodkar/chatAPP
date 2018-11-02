import { FETCH_USERS } from './types';
import axios from '../../axiosInstance'

export const fetchUsers = () => dispatch => {
    axios.get(`api/users`)
    .then( users => 
        dispatch({
            type: FETCH_USERS,
            payload: users
        })
    )
    .catch( error => {
        console.log(error);
    });
};