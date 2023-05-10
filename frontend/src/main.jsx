import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthContextProvider} from './context/AuthContext'
import { AppContextProvider } from './AppContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <AppContextProvider>
        <App/>
      </AppContextProvider>
    </AuthContextProvider>
)
