import { FETCH_USERS } from './types';
import axios from '../../axiosInstance'

export const fetchUsers = () => dispatch => {
    axios.get(`api/users`)
    .then( response => 
        dispatch({
            type: FETCH_USERS,
            payload: response.data
        })
    )
    .catch( error => {
        console.log(error);
    });
};