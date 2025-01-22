import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'


const CheckLogin = () => {    

    const {setUser} = useContext(AppStateContext);

    useEffect ( () => {
        const checkUserLoggedIn = async () => {
            let response;
            try {
                //dohvaćenje korisnika sa backenda iz sessiona
                response = await axios.get('https://campus-hero.onrender.com/campus-hero/prijava',
                //response = await axios.get('http://localhost:8080/campus-hero/prijava',
                    {withCredentials: true}
                );
                //za status 200, korisnik je prijavljen i prokazuje se njegovo ime
                if (response.status === 200) {
                    console.log('Korisnik je već registriran!');
                    setUser(response.data);
                    console.log(response.data);
                    console.log(response.data.name);
                }
                //za status 204, korisnik nije prijavljen i prokazuje se mogućnost prijave
                else if (response.status === 204){
                    console.log('Gost');

                }
            } catch (error) {
                console.error('Neuspješna provjera prijavljenog korisnika ', error);
            }
        }

        //pri stvaranju komponente CheckLogin (refresh stranice), provjerava se je li netko prijavljen
        checkUserLoggedIn();
    }, []);

    return (
        <></>
    );
};


export default CheckLogin;

