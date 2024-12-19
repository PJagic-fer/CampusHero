import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'
import {useForm} from 'react-hook-form';

const UserDataForm = () => {

    const {user, setUser} = useContext(AppStateContext);

    const  {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues:{
            name: user.name,
            surname: user.surname,
            email: user.email,
            jmbag: user.jmbag,
            city: user.city,
            studentHome: user.studentHome,
            faculty: user.faculty
        }});

    const [listStudentHomes, setListStudentHomes]  = useState([]);
    const [listFaculties, setListFaculties]  = useState([]);
    const [listCities, setListCities]  = useState([]);
   
    const getAttributeValues = async (attribute) => {
        let response;
        try {
            //dohvaćenje atributa iz baze
            response = await axios.get(`https://campus-hero.onrender.com/campus-hero/${attribute}`);
            //response = await axios.get(`http://localhost:8080/campus-hero/${attribute}`);
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

    let optionsStudentHomes = mapAttribtesToOptions(listStudentHomes);
    let optionsFaculties = mapAttribtesToOptions(listFaculties);
    let optionsCities = mapAttribtesToOptions(listCities);

    //slanje novih podataka o korisniku u bazu
    const onSubmitProfile = async (profileData) => {
        console.log(profileData)
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
        setUser(profileDataNoIds);
        try {
            const response = await axios.post('http://campus-hero.onrender.com/campus-hero/profil',
            //const response = await axios.post('http://localhost:8080/campus-hero/profil',
                profileDataNoIds,
                {withCredentials: true}
              );
              
            if (response.status === 200) {
                console.log("Korisnik uspješno registriran!");
                //onClose();
            }
        } catch (error) {
            console.error("Greška prilikom registracije korisnika", error);
        }
    }; 

    return(
        <div className="user-data-container">
            <form className="user-data-form" onSubmit={handleSubmit(onSubmitProfile)}>
            <div>
                <label>Ime:</label>
                <input
                    {...register("name",{
                        required: "Ime je obavezno"
                    })}
                    type="text"
                />
                {errors.name && (<div className="error-message">{errors.name.message}</div>)}
            </div>
            <div>
                <label>Prezime:</label>
                <input
                    {...register("surname",{
                        required: "Prezime je bavezno"
                    })}
                    type="text"
                />
                {errors.surname && (<div className="error-message">{errors.surname.message}</div>)}
            </div>
            <div>
                <label>Email:</label>
                <input
                    {...register("email",{
                        required: "Email je obavezan",
                        validate: (val) => {
                            if (!val.includes("@")){
                                return "email mora sdržavati @";
                            }
                            return true;
                        }
                    })}
                    type="text"
                    placeholder="ime.prezime@gmail.com"
                />
                {errors.email && (<div className="error-message">{errors.email.message}</div>)}
            </div> 
            <div>
                <label>JMBAG:</label>
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
                    type="text"
                    placeholder="0123456789"
                />
                {errors.jmbag && (<div className="error-message">{errors.jmbag.message}</div>)}
            </div>
            <div>
                <label>Mjesto:</label>
                <select
                    {...register("city")}
                >
                    <option key="0" value="0">neispunjeno</option>
                    {optionsCities}
                </select>
            </div>
            <div>
                <label>Studentski dom:</label>
                <select
                    {...register("studentHome")}
                >
                    <option key="0" value="0">neispunjeno</option>
                    {optionsStudentHomes}
                </select>
            </div>
            <div>
                <label>Fakultet:</label>
                <select
                    {...register("faculty")}
                >
                    <option key="0" value="0">neispunjeno</option>
                    {optionsFaculties}
                </select>
            </div>
            <button type="submit">Pohrani promjene</button>
            </form>
        </div>
    );
};

export default UserDataForm;