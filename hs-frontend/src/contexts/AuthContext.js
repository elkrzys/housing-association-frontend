import { createContext, useState, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import AuthService from '../services/AuthService';

const AuthState = () => ({
  token: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: JSON.parse(localStorage.getItem('user')),
  role: localStorage.getItem('role'),
});

const AuthContext = createContext(AuthState());

const getUserFromResponse = result => ({
  id: result.data.id,
  firstName: result.data.firstName,
  lastName: result.data.lastName,
  email: result.data.email,
});

const setLocalStorageData = result => {
  localStorage.setItem('accessToken', result.data.accessToken);
  const user = getUserFromResponse(result);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('role', result.data.role);
  axios.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`;
};

const clearUserData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  Cookies.remove('refreshToken');
  axios.defaults.headers.common.Authorization = undefined;
};

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(AuthState());

  const signIn = useCallback(async (email, password) => {
    const response = await AuthService.signIn(email, password);
    if (response.status === 'SUCCESS') {
      setLocalStorageData(response);
      setState({
        token: response.data.accessToken,
        refreshToken: Cookies.get('refreshToken'),
        user: getUserFromResponse(response),
        role: response.data.role
      });
      return true;
    }
    return false;
  }, []);

  const signUp = useCallback(
    async (firstName, lastName, phoneNumber, email, password) => {
      const response = await AuthService.signUp(
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      );
      if (response.status === 'SUCCESS') {
        return true;
      }
      return false;
    }, []
  );

  const signOut = useCallback(() => {
    clearUserData();
    setState({ accessToken: null, refreshToken: null, user: null });
  }, []);

  const resetPassword = useCallback(async (email, phoneNumber, password) => {
    const response = await AuthService.resetPassword(
      email,
      phoneNumber,
      password,
    );
    if (response.status === 'SUCCESS') {
      return true;
    }
    return false;
  }, []);

  const refreshUser = useCallback((newUser) => {
    setState((prev=> {
      const newState = {...prev}
      newState.user = newUser;
      return newState
    }));
    localStorage.setItem('user', JSON.stringify(newUser))
  }, []);

  const refreshToken = useCallback(async () => {
    const response = await AuthService.refreshToken();
    if (response.status === 'SUCCESS') {
      clearUserData()
      setLocalStorageData(response);
      setState({
        token: localStorage.getItem('accessToken'),
        refreshToken: Cookies.get('refreshToken'),
        user: getUserFromResponse(response),
        role: localStorage.getItem('role')
      });
      return true;
    }
    return false;
  }, []);

  useMemo(() => {
    axios.interceptors.request.use(config => {
      config.withCredentials = true;
      return config;
    });

    axios.interceptors.response.use((response)=> response, async error => {
      const request = error.config;
      if(error.response.status === 401 && request?.url?.includes('/auth/refresh-token')){
        signOut();
        return;
      }
      if(error.response.status === 401) {
        const result = await refreshToken();
        if(result){
          request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          return axios(request)
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, signOut, resetPassword, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
