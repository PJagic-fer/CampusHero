import React, { useState } from "react";
import "./BuddyWorld.css";
import osoba1 from '../../Components/assets/avatar.jpg'

const BuddyWorld = () => {
  const [activeSection, setActiveSection] = useState(""); // Praćenje aktivnog dijela
  const [filter, setFilter] = useState({ faculty: "", city: "" }); // Filtri za fakultet i mjesto
  // Primjer podataka o Buddyjima
  const buddyList = [
    {
      id: 1,
      name: "Ivan Horvat",
      faculty: "FER",
      age: 18,
      city: "Zagreb",
      avatar: "avatarPlaceholder",
    },
    {
      id: 2,
      name: "Ana Kovačić",
      faculty: "EFZG",
      age: 22,
      city: "Split",
      avatar: "avatarPlaceholder",
    },
    {
      id: 3,
      name: "Marko Novak",
      faculty: "PMF",
      age: 20,
      city: "Osijek",
      avatar: "avatarPlaceholder",
    },
    {
      id: 4,
      name: "Patricija Gotovac",
      faculty: "PMF",
      age: 20,
      city: "Zadar",
      avatar: "avatarPlaceholder",
    },
  ];

  const filteredBuddyList = buddyList.filter(
    (buddy) =>
      (!filter.faculty || buddy.faculty === filter.faculty) &&
      (!filter.city || buddy.city === filter.city)
  );

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
            {filteredBuddyList.map((buddy) => (
              <div className="buddy-card" key={buddy.id}>
                <img src={osoba1} alt={`${buddy.name} avatar`} className="buddy-avatar" />
                <div className="buddy-info">
                  <h3>{buddy.name}</h3>
                  <p>Fakultet: {buddy.faculty}</p>
                  <p>Mjesto: {buddy.city}</p>
                </div>
              </div>
            ))}
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
