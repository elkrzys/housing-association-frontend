import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const AuthService = {
  signIn: async (email, password) => {
    try {
      const response = await axios.post(Endpoints.login, {
        email,
        password,
      });
      console.log('response', response);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      console.log(error);
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  signUp: async (firstName, lastName, phoneNumber, email, password) => {
    try {
      const response = await axios.post(Endpoints.register, {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      console.log('response', response);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      console.log(error);
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  resetPassword: async (email, phoneNumber, password) => {
    try {
      const response = await axios.post(Endpoints.resetPassword, {
        email,
        phoneNumber,
        password,
      });
      console.log('response', response);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      console.log(error);
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  refreshToken: async token => {
    try {
      const response = await axios.post(Endpoints.refreshToken, {
        token,
      });
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      console.log(error);
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
};

export default AuthService;
