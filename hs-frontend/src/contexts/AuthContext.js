import { createContext, useState, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import AuthService  from '../services/AuthService'
import axios from 'axios'

const AuthState = {
    token: null,
    refreshToken: null,
    user: null
}

const AuthContext = createContext(AuthState)

const setUserData = (result) => {
    console.log(result.data.accessToken)
    localStorage.setItem('accessToken',result.data.accessToken)
    let user = { id: result.data.id, firstName: result.data.firstName, lastName: result.data.lastName, email: result.data.email }
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

    const [state, setState] = useState(AuthState)

    const signIn = useCallback(async (email, password) => {
        const loginResult = await AuthService.signIn(email, password);
        console.log(loginResult);
        if(loginResult){
            setUserData(loginResult)
            setState(loginResult.data)
            console.log('state: ' + state)
            return true;
        }
        return false
    }, [])

    const signOut = useCallback(() => { 
        clearUserData()
        setState({accessToken: null, refreshToken: null, user: null})
    }, [])

    const refreshToken = useCallback(async () => {

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
        <AuthContext.Provider value={{...state, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}

