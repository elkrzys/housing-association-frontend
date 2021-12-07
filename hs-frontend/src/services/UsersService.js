import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const UsersService = {
  getUser: async id => {
    let responseData = null;
    try {
      responseData = await axios.get(`${Endpoints.users}/${id}`);
      return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  updateUser: async (id, firstName, lastName, phoneNumber, email) => {
    let responseData = null;
    try {
      responseData = await axios.put(`${Endpoints.users}/${id}`, {
        firstName,
        lastName,
        phoneNumber,
        email
      });
      return { status: REQUEST_STATUS.SUCCESS, data: responseData.data };
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
  }
};
export default UsersService;
