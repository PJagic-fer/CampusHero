import React, { useContext, useState, useEffect } from "react";
import "./BuddyWorld.css";
import axios from 'axios';
import { AppStateContext } from '../../context/AppStateProvider'


const BuddyWorld = () => {
  const {fetch_path} = useContext(AppStateContext);

  const [activeSection, setActiveSection] = useState(""); // Praćenje aktivnog dijela
  const [filter, setFilter] = useState({ city: "",  studentHome: "", faculty: "" }); // Filtri za fakultet i mjesto
  const [buddyList, setBuddyList] = useState([]);
  const [filteredBuddyList, setFilteredBuddyList] = useState([]);
  const [buddyDivision, setBuddyDivision] = useState([]);
  const [studentRequestList, setStudentRequestList] = useState([]);
  const [studentRequestDivision, setStudentRequestDivision] = useState([]);
  const [requestedBuddy, setRequestedBuddy] = useState(null)

  const [listCities, setListCities]  = useState([]);
  const [listStudentHomes, setListStudentHomes]  = useState([]);
  const [listFaculties, setListFaculties]  = useState([]);

  useEffect(() => {
    if (activeSection == "findBuddy"){
      const getRequestedBuddy = async () => {
        await fetchCurrentRequestForBuddy();
      }
      getRequestedBuddy();
      fetchBuddyList();
    } else if (activeSection == "manageStudents"){
      fetchStudentRequestList();
    }
  },[activeSection])

  useEffect(() => {
    if (filteredBuddyList.length > 0) {
      setBuddyDivision(mapBuddy(filteredBuddyList));
    }
    else {
      setBuddyDivision(["Niti jedan Buddy ne odgovara Vašim željama"])
    }
  }, [filteredBuddyList, requestedBuddy])

  useEffect(() => {
    if (buddyList.length > 0) {
      setFilteredBuddyList(filterBuddyList());
    }
  }, [filter, buddyList])

  useEffect(() => {
    if (studentRequestList.length > 0) {
      setStudentRequestDivision(mapStudent(studentRequestList));
    }
  }, [studentRequestList])

  const fetchBuddyList = async () => {
    try {
      const response = await axios.get(`${fetch_path}/buddy-sustav/student/trazi-buddyja`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      });
  
      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setBuddyList(response.data);
      } else {
        console.error('Greška: Neočekivani status odgovora:', response.status);
      }
    } catch (error) {
      if (error.status === 406){
        alert("Ovaj Buddy Vas je blokirao");
      }
      else{
      console.error('Greška prilikom dohvaćanja Buddy liste:', error);
    }}
  };

  const fetchCurrentRequestForBuddy = async () =>{
    try {
        // buddy kojem smo poslali zahtjev
        const response = await axios.get(`${fetch_path}/buddy-sustav/student/trazeni-buddy`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      });
  
      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setRequestedBuddy(response.data);
      } else {
        console.error('Greška: Neočekivani status odgovora:', response.status);
      }
    } catch (error) {
      console.error('Greška prilikom dohvaćanja Buddy liste:', error);
    }
  };

  const fetchStudentRequestList = async () => {
    try {
      const response = await axios.get(`${fetch_path}/buddy-sustav/buddy/zahtjevi`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      });
  
      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setStudentRequestList(response.data);
      } else {
        console.error('Greška: Neočekivani status odgovora:', response.status);
      }
    } catch (error) {
      console.error('Greška prilikom dohvaćanja liste studenata:', error);
    }
  };

  const handleRequestThisBuddyClick = async (buddy) => {
    try {
      const response = await axios.post(`${fetch_path}/buddy-sustav/student/trazi-buddyja`, 
        {"value":buddy.id},
        {withCredentials: true});
    if (response.status === 200) {
      setRequestedBuddy(buddy);
    } else {
      console.error('Greška: Neočekivani status odgovora:', response.status);
    }
  } catch (error) {
    console.error('Greška prilikom dohvaćanja Buddy liste:', error);
  }
  };

  const mapBuddy = (buddys) => {
    return buddys.map((user) => (
      <div
        className= {(requestedBuddy && requestedBuddy.id == user.id) ? "buddy-appuser-card requested-buddy-appuser-card" : "buddy-appuser-card"}
        key={`${user.id}`}
        id={`user${user.id}`}
        onClick={() => handleRequestThisBuddyClick(user)} 
      >
        {(requestedBuddy && requestedBuddy.id == user.id) && <p className="buddy-info requested-buddy-info">requested buddy</p>}
        {user.name && <p className="buddy-info">Ime: {user.name}</p>}
        {user.city?.name && <p className="buddy-info">Grad: {user.city.name}</p>}
        {user.studentHome?.name && <p className="buddy-info">Dom: {user.studentHome.name}</p>}
        {user.faculty?.name && <p className="buddy-info">Fakultet: {user.faculty.name}</p>}
      </div>
    ));
  };

  const checkCity = (buddy) => {
    if (filter.city == ""){
      return true;
    }
    else if (buddy.city){
      if (filter.city == buddy.city.id){
        return true;
      }
    }
    return false;
  }
  const checkStudentHome = (buddy) => {
    if (filter.studentHome == ""){
      return true;
    }
    else if (buddy.studentHome){
      if (filter.studentHome == buddy.studentHome.id){
        return true;
      }
    }
    return false;
  }
  const checkFaculty = (buddy) => {
    if (filter.faculty == ""){
      return true;
    }
    else if (buddy.faculty){
      if (filter.faculty == buddy.faculty.id){
        return true;
      }
    }
    return false;
  }

  const filterBuddyList = () => {
    return buddyList.filter( (buddy) => {
      if (checkCity(buddy) && checkStudentHome(buddy) && checkFaculty(buddy)){
        return true;
      }
      return false;
    }
    );
  }
  
  const handleAproveThisStudetClick = async (student) => {
    /*try {
      const response = await axios.post(`http://localhost:8080/campus-hero/buddy-sustav/student/trazi-buddyja`, 
        {"value":student.id},
        {withCredentials: true});
    if (response.status === 200) {
      setRequestedBuddy(student);
      alert(`Poslali ste zahtjev buddyju: ${student.name}`);
    } else {
      console.error('Greška: Neočekivani status odgovora:', response.status);
    }
  } catch (error) {
    console.error('Greška prilikom dohvaćanja Buddy liste:', error);
  }*/
    alert(`Odobrili ste zahtjev studentu: ${student.name}`);
  };

  const mapStudent = (students) => {
    return students.map((user) => (
      <div
        className= "buddy-appuser-card"
        key={`${user.user.id}`}
        id={`user${user.user.id}`}
        onClick={() => handleAproveThisStudetClick(user.user)} 
      >
        {user.user.name && <p className="buddy-info">Ime: {user.user.name}</p>}
        {user.user.city?.name && <p className="buddy-info">Grad: {user.user.city.name}</p>}
        {user.user.studentHome?.name && <p className="buddy-info">Dom: {user.user.studentHome.name}</p>}
        {user.user.faculty?.name && <p className="buddy-info">Fakultet: {user.user.faculty.name}</p>}
      </div>
    ));
  };
  
  useEffect(() => {
    const getFilterValues = async () => {
      setListCities( mapAttribtesToOptions ( await getAttributeValues("gradovi")));  
      setListStudentHomes(mapAttribtesToOptions ( await getAttributeValues("domovi")));
      setListFaculties(mapAttribtesToOptions ( await getAttributeValues("fakulteti")));
      };
      
      getFilterValues();
    }, []);

  // filter za buddy listu- za sad ne treba
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
  

  return (
    <div className="buddy-world-container">
      <div className="buddy-world-image">
        <h1 className="buddy-world-main-title">Odaberi dio Buddy svijeta u koji želiš zaviriti</h1>
      </div>
      <div className="buddy-world-buttons">
        <button className="buddy-button" onClick={() => setActiveSection("findBuddy")}>
          <span>Pronađi Buddyja</span>
        </button>
        <button className="buddy-button" onClick={() => setActiveSection("manageBuddy")}>
          <span>Upravljaj Buddyjem</span>
        </button>
        <button className="buddy-button" onClick={() => setActiveSection("chat")}>
          <span>Razgovori</span>
        </button>
        <button className="buddy-button" onClick={() => setActiveSection("manageStudents")}>
          <span>Upravljaj Studentima</span>
        </button>
      </div>

      {activeSection === "findBuddy" && (
        <div className="buddy-section">
          <h2>Pronađi Buddyja</h2>
          <p>Ovdje možeš pregledati popis dostupnih Buddyja i odabrati onog koji ti najbolje odgovara.</p>
          {requestedBuddy && <p style={{color: "#d83071bc"}}>Zahtjev je poslan buddyju: {requestedBuddy.name}</p>}

          {/* Filter sekcija */}
          <div className="filter-section">
            
            <label>
              Mjesto:
              <select
                value={filter.city}
                onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              >
                <option value="">Sva mjesta</option>
                {listCities}
              </select>
            </label>

            <label>
              Domovi:
              <select
                value={filter.studentHome}
                onChange={(e) => setFilter({ ...filter, studentHome: e.target.value })}
              >
                <option value="">Svi domovi</option>
                {listStudentHomes}
              </select>
            </label>

            <label>
              Fakultet:
              <select
                value={filter.faculty}
                onChange={(e) => setFilter({ ...filter, faculty: e.target.value })}
              >
                <option value="">Svi fakulteti</option>
                {listFaculties}
              </select>
            </label>
          </div>


          {/* Prikaz filtriranih Buddyja */}
          <div className="buddy-grid">
            {buddyDivision}
          </div>
        </div>
      )}

      {/* Sekcija za "Upravljaj Buddyjem" */}
      {activeSection === "manageBuddy" && (
        <div className="buddy-section">
          <h2>Upravljaj Buddyjem</h2>
          <p>Ovdje možeš brisati, uređivati ili pregledavati trenutne Buddyje.</p>
          <button>Izbriši Buddyja</button>
          <button>Uredi Buddyja</button>
        </div>
      )}

      {/* Sekcija za "Razgovori" */}
      {activeSection === "chat" && (
        <div className="buddy-section">
          <h2>Razgovori</h2>
          <p>Uskoro ćeš moći pregledavati i razmjenjivati poruke zajedno s Buddyjem!</p>
        </div>
      )}

      {/* Sekcija za "Upravljaj Studentima" */}
      {activeSection === "manageStudents" && (
        <div className="buddy-section">
          <h2>Upravljaj Studentima</h2>
          <p>Ovdje možeš dodavati, uređivati ili brisati studente koji koriste Buddy svijet.</p>

          <div className="buddy-grid">
            {studentRequestDivision}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuddyWorld;
