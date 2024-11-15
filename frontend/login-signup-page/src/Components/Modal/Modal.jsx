import React, { useState } from 'react';
import './Modal.css';
import logo from '../assets/logo.png'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

const Modal = ({ isOpen, onClose, setUser }) => {    

    if (!isOpen) return null;
    const [tokenId, setTokenId] = useState(null);
    

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            setTokenId(token); // Sprema tokenId u stanje
            console.log("Ovo je tokenId: " + token); //Ispisuje tokenId u konzoli
            // Pošalji token ID na backend
            const response = await axios.post('https://campus-hero.onrender.com/campus-hero/prijava', token, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Korisnik je već registriran!');
                setUser(response.data.name);
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('Korisnik nije pronađen, kreiranje novog korisnika.');
                setUser(error.response.data.name);
                onClose();
            } else {
                console.error('Neuspješno slanje token ID na backend', error);
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={logo} alt='' className='modal-logo'/>
                <h1>Dobrodošao, naš Hero!</h1>
                <p>Započni svoju avanturu na kampusu! Pregledaj novosti.</p>
                <GoogleLogin 
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.log("Prijava nije uspješna!")}
                />
            </div>
        </div>
    );
};

export default Modal;

