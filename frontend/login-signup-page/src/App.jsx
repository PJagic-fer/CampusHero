import { useState } from 'react'
import './App.css'
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function App() {
  return(
    <div>
      <LoginSignup/>
    </div>
  );
}

export default App
