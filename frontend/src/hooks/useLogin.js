import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password, setLogInModalShow) => {
        setIsLoading(true)
        setError(null)

        axios.post(`${API_BASE_URL}/users/login`,{
            username,
            password
          })
          .then((response) => {

            // save user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))
        
            //update AuthContext
            dispatch({type: 'LOGIN', payload: response.data})
        
            setIsLoading(false)
            setLogInModalShow(false)
          })
          .catch((error) => {
            setIsLoading(false)
            setError(error.response.data.error)
          })
    }

    return { login, isLoading, error }
}