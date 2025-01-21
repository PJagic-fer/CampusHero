import React, { useState, useEffect } from "react";
import "./BuddyWorld.css";
import osoba1 from '../../Components/assets/avatar.jpg'
import axios from 'axios';


const BuddyWorld = () => {
  const [activeSection, setActiveSection] = useState(""); // Praćenje aktivnog dijela
  const [filter, setFilter] = useState({ faculty: "", city: "" }); // Filtri za fakultet i mjesto
  const [buddyList, setBuddyList] = useState([]);
  const [buddyDivision, setBuddyDivision] = useState([]);
  const [studentRequestList, setStudentRequestList] = useState([]);
  const [studentRequestDivision, setStudentRequestDivision] = useState([]);

  useEffect((activeSection) => { 
    if (activeSection = "findBuddy"){
      fetchBuddyList();
    } else if (activeSection = "manageStudents"){
      fetchStudentRequestList();
    }
  },[activeSection])

  useEffect(() => {
    if (buddyList.length > 0) {
      setBuddyDivision(mapBuddy(buddyList));
    }
  }, [buddyList])

  useEffect(() => {
    if (studentRequestList.length > 0) {
      setStudentRequestDivision(mapBuddy(studentRequestList));
    }
  }, [studentRequestList])

  const fetchBuddyList = async () => {
    try {
      // Pretpostavimo da je URL endpointa na backendu "/campus-hero/buddy-list"
      const response = await axios.get(`http://localhost:8080/campus-hero/buddy-sustav/student/trazi-buddyja`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      });
  
      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setBuddyList(response.data);
      } else {
        console.error('Greška: Neočekivani status odgovora:', response.status);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja Buddy liste:', error);
    }
  };

  const fetchStudentRequestList = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/campus-hero/buddy-sustav/buddy/zahtjevi`, {
        withCredentials: true, // Ako backend zahtijeva autentifikaciju putem kolačića
      });
  
      if (response.status === 200) {
        // Vraća dohvaćene podatke
        setBuddyList(response.data);
      } else {
        console.error('Greška: Neočekivani status odgovora:', response.status);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja Buddy liste:', error);
    }
  };


  const mapBuddy = (buddys) => {
    return buddys.map((user) => (
      <div
        className="buddy-appuser-card"
        key={`${user.id}`}
        id={`user${user.id}`}
        onClick={() => handleUserClick(user)} //ovdje se salje zahtjev buddyu, pitati patrika gdje se salje zahtjev
      >
        {user.name && <p className="buddy-info">Ime: {user.name}</p>}
        {user.city?.name && <p className="buddy-info">Dolazi iz grada: {user.city.name}</p>}
        {user.studentHome?.name && <p className="buddy-info">Stanuje u domu: {user.studentHome.name}</p>}
        {user.faculty?.name && <p className="buddy-info">Studira na fakultetu: {user.faculty.name}</p>}
      </div>
    ));
  };
  
  const handleUserClick = (user) => {
    alert(`Kliknuli ste na korisnika: ${user.name}`);
  };
  

  // filter za buddy listu- za sad ne treba
  

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

          {/* Filter sekcija */}
          <div className="filter-section">
            <label>
              Fakultet:
              <select
                value={filter.faculty}
                onChange={(e) => setFilter({ ...filter, faculty: e.target.value })}
              >
                <option value="">Svi fakulteti</option>
                <option value="FER">FER</option>
                <option value="EFZG">EFZG</option>
                <option value="PMF">PMF</option>
              </select>
            </label>
            <label>
              Mjesto:
              <select
                value={filter.city}
                onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              >
                <option value="">Sva mjesta</option>
                <option value="Zagreb">Zagreb</option>
                <option value="Split">Split</option>
                <option value="Osijek">Osijek</option>
                <option value="Zadar">Zadar</option>
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
        </div>
      )}
    </div>
  );
};

export default BuddyWorld;
