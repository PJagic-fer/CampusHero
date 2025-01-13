import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import './Admin.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'


const Admin = () => {
    const navigate = useNavigate();

    const {user, setUser} = useContext(AppStateContext);

    const [listUsers, setListUsers] = useState();
    const [listBuddyRequests, setLisBuddyRequests] = useState();
    const [listAdminRequests, setLisAdminRequests] = useState();

    const getUsers = async () => {
        try {   
            //dohvaćenje korisnika iz baze
            //response = await axios.get("https://campus-hero.onrender.com/campus-hero/admin/korisnici");
            let response = await axios.get("http://localhost:8080/campus-hero/admin/korisnici",
                {withCredentials: true});
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    const mapUsers = (userList) =>{
        return userList.map((user) => <div className= "admin-appuser-container" key={`${user.id}`} id={`user${user.id}`}>
                                <h3 className='h3-admin'>{user.name} {user.surname}</h3>
                                <div className="admin-appuser-data-container">
                                    <p>email : {user.email} </p>
                                    {user.jmbag && <p>jmbag: {user.jmbag}</p>}
                                    {user.city && <p>dolazi iz grada: {user.city.name}</p>}
                                    {user.studentHome && <p>stanuje u domu: {user.studentHome.name}</p>}
                                    {user.faculty && <p>studira na fakultetu: {user.faculty.name}</p>}
                                </div>
                            </div>)
    }

    const handleUsers = async () => {
        setListUsers([]);
        setLisBuddyRequests([]);
        setLisAdminRequests([]);
        let users= await getUsers();
        setListUsers(mapUsers(users));
    }

    const getAdminRequests = async () => {
        try {   
            //dohvaćenje admin prijava iz baze
            //response = await axios.get("https://campus-hero.onrender.com/campus-hero/admin/admin-kandidati");
            let response = await axios.get("http://localhost:8080/campus-hero/admin/admin-kandidati",
                {withCredentials: true});
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }


    const mapAdminRequests = (adminRequestList) =>{
        return adminRequestList.map((request) => <div className= "admin-appuser-container" key={`${request.id}`} id={`admin_request${request.id}`}>
                                <h3 className='h3-admin'>{request.applicant.name} {request.applicant.surname}</h3>
                                <div className="admin-appuser-data-container">
                                    <p>O meni... : {request.personalInfo} </p>
                                    <p>Iskustva s Campus Hero : {request.experiences} </p>
                                    <p>Vlastite sposobnosti : {request.competencies} </p>
                                    <p>zahtjev poslan : {request.time}</p>
                                    <div className="admin-appuser-button-container">
                                        <button className="admin-appuser-button" onClick={() => handleApprove(request)}>Prihvati</button>
                                        <button className="admin-appuser-button admin-appuser-button-deny" onClick={() => handleDeny(request)}>Odbij</button>
                                    </div>
                                </div>
                            </div>)
    }

    const handleAdminRequests = async () => {
        setListUsers([]);
        setLisBuddyRequests([]);
        setLisAdminRequests([]);
        let adminRequests = await getAdminRequests();
        if (adminRequests.length == 0){
            console.log("nula");
            setLisBuddyRequests(<div className="admin-appuser-container padding-bottom-exists">
                <p>Nitko ne želi biti admin</p>
            </div>);
        }
        else {
            setLisAdminRequests(mapAdminRequests(adminRequests));
        }
    }

    const approveAdmin = async (approvedAdminRequest) => {
        try {   
            //dohvaćenje admin prijava iz baze
            //response = await axios.post("https://campus-hero.onrender.com/campus-hero/admin/admin-kandidati/odobri");
            await axios.post("http://localhost:8080/campus-hero/admin/admin-kandidati/odobri",
                approvedAdminRequest,
                {withCredentials: true});
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    const handleApprove = async (approvedAdminRequest) => {
        console.log(approvedAdminRequest); 
        await approveAdmin(approvedAdminRequest);
        handleAdminRequests();
    }

    const denyAdmin = async (deniedAdminRequest) => {
        try {   
            //dohvaćenje admin prijava iz baze
            //response = await axios.post("https://campus-hero.onrender.com/campus-hero/admin/admin-kandidati/odbij");
            await axios.post("http://localhost:8080/campus-hero/admin/admin-kandidati/odbij",
                deniedAdminRequest,
                {withCredentials: true});
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    const handleDeny = async (deniedAdminRequest) => {
        console.log(deniedAdminRequest); 
        await denyAdmin(deniedAdminRequest);
        handleAdminRequests();
    }

    /*
    const getBuddyRequests = async () => {
        try {   
            //dohvaćenje admin prijava iz baze
            //response = await axios.get("https://campus-hero.onrender.com/campus-hero/admin/buddy-kandidati");
            let response = await axios.get("http://localhost:8080/campus-hero/admin/buddy-kandidati",
                {withCredentials: true});
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }
    */

    /*
    const mapBuddyRequests = (addminRequestList) =>{
        return addminRequestList.map((request) => <div className= "admin-appuser-container" key={`${request.id}`} id={`buddy_request${request.id}`}>
                                <h3 className='h3-admin'>{request.applicant.name} {request.applicant.surname}</h3>
                                <div className="admin-appuser-data-container">
                                    <p>O meni... : {request.personalInfo} </p>
                                    <p>Iskustva s Campus Hero : {request.experiences} </p>
                                    <p>Vlastite sposobnosti : {request.competencies} </p>
                                    <div className="admin-appuser-button-container">
                                        <button className="admin-appuser-button">Prihvati</button>
                                        <button className="admin-appuser-button admin-appuser-button-deny">Odbij</button>
                                    </div>
                                </div>
                            </div>)
    }
    */

    const handleBuddyRequests = async () => {
        setListUsers([]);
        setLisBuddyRequests([]);
        setLisAdminRequests([]);
        /*
        let buddyRequests = await getBuddyRequests();
        if (buddyRequests.length == 0){
            console.log("nula")
            setLisBuddyRequests("nitko ne želi biti admin");
        }
        else {
            setLisBuddyRequests(mapBuddyRequests(buddyRequests));
        }
        */
              
        setLisBuddyRequests(<div className="admin-appuser-container padding-bottom-exists">
            <p>Letovi za BuddyWorld su otkazani do daljnjega</p>
        </div>);
    }

    const handleAdminQuit = async () => {
        try {   
            //response = await axios.get("https://campus-hero.onrender.com/campus-hero/admin/odjava");
            let response = await axios.post("http://localhost:8080/campus-hero/admin/odjava",
                {},
                {withCredentials: true});
            setUser({...user, isAdmin: false});
            console.log("korisnik nije više admin");
            navigate('/');
            window.scrollTo({top:0});
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    return (
        <>
        <div className="nav-placeholder"> </div>
        <div className="container">
        <div className="admin-buttons-container">
            <button className="button-profile button-admin" onClick={handleUsers}>Izlistaj korisnike</button>
            <button className="button-profile button-admin" onClick={handleBuddyRequests}>Izlistaj buddy prijave</button>
            <button className="button-profile button-admin" onClick={handleAdminRequests}>Izlistaj admin prijave</button>
            <button className="button-profile button-logout" onClick={handleAdminQuit}>prestani biti admin</button>
        </div>
            {listUsers}
            {listBuddyRequests}
            {listAdminRequests}
        </div>
        </>
    );
};

export default Admin;