import { ADD_USER } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/users';

export const createUser = ({ firstName, lastName, email }) => {
    return (dispatch) => {
      return axios.post(`${apiUrl}`, {firstName, lastName, email})
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
        lastName: data.lastName,
        email: data.email
      }
    }
};