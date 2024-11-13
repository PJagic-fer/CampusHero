import React, { useState } from "react";
import './LoginSignup.css'; 
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import RegistrationForm from './RegistrationForm';

const LoginSignup = () => {
    const [showForm, setShowForm] = useState(false);
    const [tokenId, setTokenId] = useState(null);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            setTokenId(token); // Sprema tokenId u stanje

            // Pošalji token ID na backend
            const response = await axios.post('http://localhost:8080/campus-hero/prijava', token, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Korisnik je već registriran!');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('Korisnik nije pronađen, prikazujem registracijski formular.');
                setShowForm(true); // Postavimo stanje za prikaz formulara
            } else {
                console.error('Neuspješno slanje token ID na backend', error);
            }
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className="container"> 
            <div className="header">
                <h2><span>Campus Hero</span></h2>
            </div>
            <div className="logins">
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.log("Login failed")}
                />
                <span className="or">Or</span>
                <h3>Continue As <span>Guest</span></h3>
            </div>
            {showForm && <RegistrationForm onClose={handleCloseForm} tokenId={tokenId} />}
            <div className="bottom-container">
                {/* Sadržaj na dnu forme */}
            </div>
        </div>
    );
};

export default LoginSignup;
