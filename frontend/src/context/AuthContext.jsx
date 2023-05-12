import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext()

// Defining the authReducer function to update the authentication context state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload, loading: false}
        case 'LOGOUT':
            return { user: null, loading: false}
        default:
            return state
    }
} 

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        loading: true
    })

    const [loading, setLoading] = useState(true)

    // Setting inital auth status
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        } else {
            dispatch({type: 'LOGOUT'})
        }

        setLoading(false)
    }, [])

    console.log('AuthContext state ', state)

    // Allow children components to access user authentication context value
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}