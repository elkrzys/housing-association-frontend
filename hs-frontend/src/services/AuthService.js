import axios from 'axios';
import { Endpoints, REQUEST_STATUS } from '../strings';

const AuthService = {
  signIn: async (email, password) => {
    try {
      const response = await axios.post(Endpoints.login, {
        email,
        password,
      });
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
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
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
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
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
  refreshToken: async () => {
    try {
      const response = await axios.post(Endpoints.refreshToken);
      return { status: REQUEST_STATUS.SUCCESS, data: response.data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  },
};

export default AuthService;
