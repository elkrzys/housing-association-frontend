import { createContext, useState, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import AuthService  from '../services/AuthService'
import axios from 'axios'

// change it to store 
const AuthState = () => ({
    token: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: JSON.parse(localStorage.getItem('user'))
})

const AuthContext = createContext(AuthState())


const getUserFromResponse = (result) => ({ id: result.data.id, firstName: result.data.firstName, lastName: result.data.lastName, email: result.data.email })

const setLocalStorageData = (result) => {
    localStorage.setItem('accessToken',result.data.accessToken)
    let user = getUserFromResponse(result)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('role', result.data.role)
    axios.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`
}

const clearUserData = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    Cookies.remove('refreshToken')
    axios.defaults.headers.common.Authorization = undefined
}

const AuthContextProvider = ({children}) =>{

    const [state, setState] = useState(AuthState())

    const signIn = useCallback(async (email, password) => {
        const response = await AuthService.signIn(email, password);
        console.log(response);
        if(response.status === 'SUCCESS'){
            setLocalStorageData(response)
            setState({ token: response.data.accessToken, refreshToken: localStorage.getItem('refreshToken'), user: getUserFromResponse(response) })
            console.log('state: ' + state)
            return true;
        }
        return false;
    }, [])

    const signUp = useCallback(async(firstName, lastName, phoneNumber, email, password) => {
        const response = await AuthService.signUp(firstName, lastName, phoneNumber, email, password);
        console.log(response);
        if(response.status === 'SUCCESS'){
            return true;
        }
        return false;
    }, [])

    const signOut = useCallback(() => { 
        clearUserData()
        setState({accessToken: null, refreshToken: null, user: null})
    }, [])

    const resetPassword = useCallback(async(email, phoneNumber, password) => {
        const response = await AuthService.resetPassword(email, phoneNumber, password);
        console.log(response)
        if(response.status === 'SUCCESS'){
            return true;
        }
        return false;
    }, [])

    const refreshToken = useCallback(async () => {
        // TODO
    })

    useMemo(() => {
        axios.interceptors.request.use((config) => {
            config.withCredentials = true;
            return config;
        })
        //axios.interceptors.response.use
        // axios.interceptors.response.use((response)=> response,async error=>{
        //     const originalRequest = error.config;
        //     if(error.response.status===401 && originalRequest.url.includes(ENDPOINT.refresh)) {
        //         signOut()
        //         return;
        //     };
        //     if(error.response.status===401) {
        //         refresh();
        //         originalRequest.headers.Authorization=`Bearer ${localStorage.getItem('accessToken')}`;
        //         axios.defaults.headers.common.Authorization=`Bearer ${localStorage.getItem('accessToken')}`;
        //         return axios(originalRequest);
        //     }
        //     throw error;
        // })
    },[])

    return (
        <AuthContext.Provider value={{...state, signIn, signUp, signOut, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}

