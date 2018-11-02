import { ADD_USER } from './types';
import axios from '../../axiosInstance'

const apiUrl = 'http://localhost:5000/api/users';

export const createUser = ({ firstName, username, email }) => {
    return (dispatch) => {
      return axios.post(`${apiUrl}`, {firstName, username, email})
        .then(response => {
          dispatch(createUserSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
};

export const createUserSuccess =  (data) => {
    return {
      type: ADD_USER,
      payload: {
        firstName: data.firstName,
        username: data.username,
        email: data.email
      }
    }
};