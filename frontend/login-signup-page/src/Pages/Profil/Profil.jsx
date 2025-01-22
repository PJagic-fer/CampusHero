import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Profil.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'
import UserDataForm from '../../Components/Profile_forms/UserDataForm';
import BecomeAdminForm from '../../Components/Profile_forms/BecomeAdminForm';


const Profil = () => {
    const navigate = useNavigate();

    const {user, setUser} = useContext(AppStateContext);

    useEffect(() => {
        window.scrollTo({top: 0})
      }, []);

    const handleAdmin = () => {
        navigate('/admin');
        window.scrollTo({top:0});
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://campus-hero.onrender.com/campus-hero/profil/odjava',
            //const response = await axios.post('http://localhost:8080/campus-hero/profil/odjava',
                {},
                {withCredentials: true}
            );
            //brisanje informacija o prethodnom korisniku iz konteksta
            if (response.status === 200) {
                console.log('Upješno odjavljen');
                setUser({
                  name: null,
                  surname: null,
                  email: null,
                  jmbag: null,
                  city: null,
                  studentHome: null,
                  faculty: null,
                  isBuddy: false,
                  buddy: null,
                  isAdmin: false
                })
                //po uspješnoj odjavi, vraćanje na početnu stranicu
                navigate('/');
                window.scrollTo({top:0});
            }
        } catch (error) {
            console.error('Neuspješna odjava korisnika ', error);
        }
    }

    return (
        <div className="profile-container">
            <h2 className='h2-profile'>{user.name} {user.surname}</h2>
            <UserDataForm/>
            <br/>
            {!user.isAdmin && <BecomeAdminForm/>}
            <br/>
            <div className="profile-container-button-logoutadmin">
                <button className="button-profile button-logout" onClick={handleLogout}>Odjavi se</button>
                {user.isAdmin && <button className="button-profile button-admin" onClick={handleAdmin}>Admin</button>}
            </div>
        </div>
    );
};

export default Profil;