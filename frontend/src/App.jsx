import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./HomePage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <Navbar/>
        <HomePage/>
    </div>
  )
}

export default App
