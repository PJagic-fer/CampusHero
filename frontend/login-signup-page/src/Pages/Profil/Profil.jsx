import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Profil.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'
import UserDataForm from '../../Components/Profile_forms/UserDataForm';
import BecomeAdminForm from '../../Components/Profile_forms/BecomeAdminForm';


const Profil = () => {
    let history = useHistory();

    const {user, setUser} = useContext(AppStateContext);

    useEffect(() => {
        window.scrollTo({top: 600})
      }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://campus-hero.onrender.com/campus-hero/profil/odjava',
            //const response = await axios.post('http://localhost:8080/campus-hero/profil/odjava',
                {},
                {withCredentials: true}
            );
            //brisanje informacija o prethodnom korisniku iz konteksta
            if (response.status === 200) {
                console.log('Upješno odjavljen');
                setUser({
                    name: null,
                    surname: String (null),
                    email: String (null),
                    jmbag: String (null),
                    city: null,
                    studentHome: null,
                    faculty: null,
                    isBuddy: Boolean(false)
                })
                //po uspješnoj odjavi, vraćanje na početnu stranicu
                history.push("/");
                window.scrollTo({top:0});
            }
        } catch (error) {
            console.error('Neuspješna odjava korisnika ', error);
        }
    }

    return (
        <div className="profile-container" id="podaci">
            <h2 className='h2-profile'>{user.name} {user.surname}</h2>
            <UserDataForm/>
            <br/>
            <BecomeAdminForm/>
            <br/>
            <button className="button-profile logout" onClick={handleLogout}>Odjavi se</button>
        </div>
    );
};

export default Profil;