import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import './Admin.css';
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'


const Admin = () => {
    const navigate = useNavigate();

    const {user, setUser, fetch_path} = useContext(AppStateContext);

    const [listUsers, setListUsers] = useState();
    const [listBuddies, setLisBuddies] = useState();
    const [listAdminRequests, setLisAdminRequests] = useState();

    const [showAdminQuitModal, setShowAdminQuitModal] = useState(false);
    

    const getUsers = async () => {
        try {   
            //dohvaćenje korisnika iz baze
            let response = await axios.get(`${fetch_path}/admin/korisnici`,
                {withCredentials: true});
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
        setLisBuddies([]);
        setLisAdminRequests([]);
        let users= await getUsers();
        setListUsers(mapUsers(users));
    }

    const getBuddies = async () => {
        try {   
            //dohvaćenje korisnika iz baze
            let response = await axios.get(`${fetch_path}/admin/buddyji`,
                {withCredentials: true});
            return response.data;
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    const handleBuddyRequests = async () => {
        setListUsers([]);
        setLisBuddies([]);
        setLisAdminRequests([]);
        let buddies= await getBuddies();
        if (buddies.length == 0){
            setLisBuddies(<div className="admin-appuser-container padding-bottom-exists">
                <p>Nema aktivnih buddyja</p>
            </div>);
        }
        else{
            setListUsers(mapUsers(buddies));
        }
    }

    const getAdminRequests = async () => {
        try {   
            //dohvaćenje admin prijava iz baze
            let response = await axios.get(`${fetch_path}/admin/admin-kandidati`,
                {withCredentials: true});
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
        setLisBuddies([]);
        setLisAdminRequests([]);
        let adminRequests = await getAdminRequests();
        if (adminRequests.length == 0){
            setLisBuddies(<div className="admin-appuser-container padding-bottom-exists">
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
            await axios.post(`${fetch_path}/admin/admin-kandidati/odobri`,
                approvedAdminRequest,
                {withCredentials: true});
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    const handleApprove = async (approvedAdminRequest) => {
        await approveAdmin(approvedAdminRequest);
        handleAdminRequests();
    }

    const denyAdmin = async (deniedAdminRequest) => {
        try {   
            //dohvaćenje admin prijava iz baze
            await axios.post(`${fetch_path}/admin/admin-kandidati/odbij`,
                deniedAdminRequest,
                {withCredentials: true});
        } catch (error) {
            console.error('Neuspješno dohvaćanje elemenata', error);
        }
    }

    const handleDeny = async (deniedAdminRequest) => {
        await denyAdmin(deniedAdminRequest);
        handleAdminRequests();
    }

    const handleAdminQuit = async () => {
        try {   
            await axios.post(`${fetch_path}/admin/odjava`,
                {},
                {withCredentials: true});
            setUser({...user, isAdmin: false});
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
            <button className="button-profile button-admin" onClick={handleBuddyRequests}>Izlistaj buddyje</button>
            <button className="button-profile button-admin" onClick={handleAdminRequests}>Izlistaj admin prijave</button>
            <button className="button-profile button-logout" onClick={() => setShowAdminQuitModal(true)}>Prestani biti admin</button>
        </div>
            {listUsers}
            {listBuddies}
            {listAdminRequests}
        </div>
        {showAdminQuitModal && (
            <div className="modal-quit-overlay">
            <div className="modal-quit-content">
                <h2 className="modal-quit-title">Prestani biti admin</h2>
                <p className="modal-quit-text">
                Klikom na "Potvrdi" potvrđuješ da se želiš odeći administratorskih prava.
                </p>
                <div className="modal-quit-buttons">
                <button onClick={() => setShowAdminQuitModal(false)} className="cancel-quit-btn">
                    Odustani
                </button>
                <button onClick={handleAdminQuit} className="confirm-quit-btn">
                    Potvrdi
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default Admin;