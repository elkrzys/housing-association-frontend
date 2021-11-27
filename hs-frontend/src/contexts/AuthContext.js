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


const getUserFromResult = (result) => ({ id: result.data.id, firstName: result.data.firstName, lastName: result.data.lastName, email: result.data.email })

const setLocalStorageData = (result) => {
    localStorage.setItem('accessToken',result.data.accessToken)
    let user = getUserFromResult(result)
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
        const loginResult = await AuthService.signIn(email, password);
        console.log(loginResult);
        if(loginResult){
            setLocalStorageData(loginResult)
            setState({ token: loginResult.data.accessToken, refreshToken: localStorage.getItem('refreshToken'), user: getUserFromResult(loginResult) })
            console.log('state: ' + state)
            return true;
        }
        return false
    }, [])

    const signUp = useCallback(async(firstName, lastName, phoneNumver, email, password) => {
        const registerResult = await AuthService.signUp(firstName, lastName, phoneNumver, email, password);
        console.log(registerResult);
        if(registerResult){
            return true;
        }
        return false;
    }, [])

    const signOut = useCallback(() => { 
        clearUserData()
        setState({accessToken: null, refreshToken: null, user: null})
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
        <AuthContext.Provider value={{...state, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}

