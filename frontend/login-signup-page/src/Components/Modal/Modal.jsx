import React, { useState, useContext } from 'react';
import './Modal.css';
import logo from '../assets/logo.png'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import PropTypes, {} from 'prop-types';
import { AppStateContext } from '../../context/AppStateProvider'


const Modal = ({ isOpen, onClose }) => {    

    const {setUser, fetch_path} = useContext(AppStateContext);

    if (!isOpen) return null;
    
    let response;
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            // Pošalji token ID na backend
            response = await axios.post(`${fetch_path}/prijava`, token, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Korisnik je već registriran!');
                setUser(response.data);
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('Korisnik nije pronađen, kreiranje novog korisnika.');
                setUser(error.response.data);
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

Modal.propTypes = {
    isOpen : PropTypes.bool,
    onClose : PropTypes.func,
}

export default Modal;

