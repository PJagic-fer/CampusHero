import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'
import {useForm} from 'react-hook-form';

const UserDataForm = () => {

    const {user, setUser, fetch_path} = useContext(AppStateContext);

    const  {register, handleSubmit, formState:{errors}, watch, reset} = useForm();

    const [listStudentHomes, setListStudentHomes]  = useState([]);
    const [listFaculties, setListFaculties]  = useState([]);
    const [listCities, setListCities]  = useState([]);

    //pomoć pri ispravnom prikazivanju trenutne vrijednosti selecta
    const cityCurrent = watch("city"); 
    const studentHomeCurrent = watch("studentHome"); 
    const facultyCurrent = watch("faculty"); 

    const getAttributeValues = async (attribute) => {
        let response;
        try {
            //dohvaćenje atributa iz baze
            response = await axios.get(`${fetch_path}/${attribute}`);
            return response.data;
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    //pretvorba liste atributa u opcije za odabir
    const mapAttribtesToOptions = (atributeList) =>{
        return atributeList.map((attribute) => <option key={`${attribute.id}`} value={`${attribute.id}`}>
                                {attribute.name}
                            </option>)
    }

    //prema id-ju u opciji, dohvaća se objekt tog atributa
    const getAttributeById = (attributeId, attributeList) =>{
        if (attributeId == 0){
            return null;
        }
        const wantedAttribute = attributeList.find((att) => {
            if (att.id == attributeId){
                return true;
            }
        });
        return wantedAttribute;
    }

    //pri učitavanju profila, dohvaćaju se trenutno dostupni domovi, gradovi i fakulteti iz baze
    useEffect ( () => {  
        const generateData = async() =>{ 
        setListStudentHomes (await getAttributeValues("domovi"));
        setListFaculties (await getAttributeValues("fakulteti"));
        setListCities (await getAttributeValues("gradovi"));
    }
        generateData();
    }, []);

    //postavljanje difoltnih vrijednosti korisničkih podataka
    useEffect ( () => {
        reset({
            name: user.name,
            surname: user.surname,
            email: user.email,
            jmbag: user.jmbag,
            city: user.city ? user.city.id : "0",
            studentHome: user.studentHome ? user.studentHome.id : "0",
            faculty: user.faculty ? user.faculty.id : "0"
        });
    }, [user, reset]);

    let optionsStudentHomes = mapAttribtesToOptions(listStudentHomes);
    let optionsFaculties = mapAttribtesToOptions(listFaculties);
    let optionsCities = mapAttribtesToOptions(listCities);

    //slanje novih podataka o korisniku u bazu
    const onSubmitProfile = async (profileData) => {
        let profileDataNoIds = {
            ...user,
            name: profileData.name,
            surname: profileData.surname,
            email: profileData.email,
            jmbag: profileData.jmbag,
            city: getAttributeById(profileData.city, listCities),
            studentHome: getAttributeById(profileData.studentHome, listStudentHomes),
            faculty: getAttributeById(profileData.faculty, listFaculties)
        }
        
        try {
            const response = await axios.post(`${fetch_path}/profil`,
                profileDataNoIds,
                {withCredentials: true}
              );
              
            if (response.status === 200) {
                //promjena podataka u kontekstu
                setUser(profileDataNoIds);
                alert("Korisnički podaci su izmjenjeni")
            }
        } catch (error) {
            if (error.response && error.response.status === 413) {
                alert('Vaš unos je predugačak.');
                console.error(error)
              }
            else if (error.response && error.response.status === 409) {
                alert('Već postoji student sa upisanim jmbagom.');
                console.error(error)
              }
            else{
                console.error("Greška prilikom slanja korisničkih podataka:", error)
              }
        }
    }; 

    return(
        <div className="user-data-container">
            <form className="user-data-form" onSubmit={handleSubmit(onSubmitProfile)}>
            <div className ="user-data-item-container">
                <label className="user-data-label">Ime:</label>
                <input
                    {...register("name",{
                        required: "Ime je obavezno",
                        maxLength: {
                            value: 255,
                            message: "Ime je predugačko"
                        }
                    })}
                    className="user-data-input"
                    type="text"
                />
                {errors.name && (<div className="error-message">{errors.name.message}</div>)}
            </div>
            <div className ="user-data-item-container">
                <label className="user-data-label">Prezime:</label>
                <input
                    {...register("surname",{
                        required: "Prezime je obavezno",
                        maxLength: {
                            value: 255,
                            message: "Prezime je predugačko"
                        }
                    })}
                    className="user-data-input"
                    type="text"
                />
                {errors.surname && (<div className="error-message">{errors.surname.message}</div>)}
            </div>
            <div className ="user-data-item-container">
                <label className="user-data-label">Email:</label>
                <input
                    {...register("email",{
                        required: "Email je obavezan",
                        maxLength: {
                            value: 255,
                            message: "Email je predugačak"
                        },
                        validate: (val) => {
                            if (!val.includes("@")){
                                return "Email mora sadržavati @";
                            }
                            return true;
                        }
                    })}
                    className="user-data-input"
                    type="text"
                    placeholder="ime.prezime@gmail.com"
                />
                {errors.email && (<div className="error-message">{errors.email.message}</div>)}
            </div> 
            <div className ="user-data-item-container">
                <label className="user-data-label">JMBAG:</label>
                <input
                    {...register("jmbag",{
                        required: "Jmbag je obavezan",
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Jmbag sadržava samo znamenke"
                        },
                        minLength: {
                            value: 10,
                            message: "Jmbag mora imati 10 znamenaka"
                        },
                        maxLength: {
                            value: 10,
                            message: "Jmbag mora imati 10 znamenaka"
                        }
                    })}
                    className="user-data-input"
                    type="text"
                    placeholder="0123456789"
                />
                {errors.jmbag && (<div className="error-message">{errors.jmbag.message}</div>)}
            </div>
            <div className ="user-data-item-container">
                <label className="user-data-label">Mjesto:</label>
                <select
                    {...register("city")}
                    value={cityCurrent}
                    className="user-data-select"
                >
                    <option key="0" value="0">neispunjeno</option>
                    {optionsCities}
                </select>
            </div>
            <div className ="user-data-item-container">
                <label className="user-data-label">Studentski dom:</label>
                <select
                    {...register("studentHome")}
                    value={studentHomeCurrent}
                    className="user-data-select"
                >
                    <option key="0" value="0">neispunjeno</option>
                    {optionsStudentHomes}
                </select>
            </div>
            <div className ="user-data-item-container">
                <label className="user-data-label">Fakultet:</label>
                <select
                    {...register("faculty")}
                    value={facultyCurrent}
                    className="user-data-select"
                >
                    <option key="0" value="0">neispunjeno</option>
                    {optionsFaculties}
                </select>
            </div>
            <div className='submit-button-container'>
                <button className="button-profile submit" type="submit">Pohrani promjene</button>
            </div>
            </form>
        </div>
    );
};

export default UserDataForm;