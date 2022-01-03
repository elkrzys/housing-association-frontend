import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const UsersService = {
  getUser: async id => {
    try {
      const response = await axios.get(`${Endpoints.users}/${id}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  updateUser: async (id, firstName, lastName, phoneNumber, email) => {
    try {
      const response = await axios.put(`${Endpoints.users}/${id}`, {
        firstName,
        lastName,
        phoneNumber,
        email
      });
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  changePassword: async (id, oldPassword, newPassword) => {
    try {
       let response = await axios.put(`${Endpoints.users}/${id}/change-password`, {
        oldPassword,
        newPassword
      });
      return { status: REQUEST_STATUS.SUCCESS };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  getUsersByRole: async (role) => {
    let endpoint = role === 'residents' ? Endpoints.usersResidents : Endpoints.usersWorkers;
    try {
      let response = await axios.get(endpoint);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  unregisterUser: async (userId, password) => {
    try{
      const response = await axios.put(`${Endpoints.usersUnregister}/${userId}`, password, { headers: {'Content-Type': 'application/json'} });
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  },
  banUser: async (userId) => {
    try{
      const response = await axios.put(`${Endpoints.usersBan}/${userId}`);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error};
    }
  }
};
export default UsersService;
