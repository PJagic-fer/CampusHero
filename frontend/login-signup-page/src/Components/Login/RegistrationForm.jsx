import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = ({ onClose, tokenId }) => {
    const [formData, setFormData] = useState({
        ime: '',
        prezime: '',
        email: '',
        jmbag: '',
        mjesto: '',
        studentskoNaselje: 'null',
        fakultet: 'null',
        buddy: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://campus-hero.onrender.com/campus-hero/profil',
                formData, // This is the data being sent
                {
                  withCredentials: true, // This ensures cookies are sent
                }
              );
              
            if (response.status === 200) {
                console.log("Korisnik uspješno registriran!");
                onClose();
            }
        } catch (error) {
            console.error("Greška prilikom registracije korisnika", error);
        }
    };    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="icon-container">
                    <img src="/app_logo.png"/>
                </div>
                <h2>Registracija korisnika</h2>
                <form onSubmit={handleSubmit} className="registration-form">
                    <div>
                        <label>Ime:</label>
                        <input
                            type="text"
                            name="ime"
                            value={formData.ime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Prezime:</label>
                        <input
                            type="text"
                            name="prezime"
                            value={formData.prezime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div> 
                    <div>
                        <label>JMBAG:</label>
                        <input
                            type="number"
                            name="jmbag"
                            value={formData.jmbag}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mjesto:</label>
                        <input
                            type="text"
                            name="mjesto"
                            value={formData.mjesto}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Studentski dom:</label>
                        <select
                            name="studentskoNaselje"
                            value={formData.studentskoNaselje}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="SD Stjepan Radić">SD Stjepan Radić</option>
                            <option value="SD Cvjetno naselje">SD Cvjetno naselje</option>
                            <option value="SD Lašćina">SD Lašćina</option>
                            <option value="SD Dr. Ante Starčević">SD Dr. Ante Starčević</option>

                        </select>
                    </div>
                    <div>
                        <label>Fakultet:</label>
                        <select
                            name="fakultet"
                            value={formData.fakultet}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Agronomski fakultet u Zagrebu">Agronomski fakultet u Zagrebu</option>
                            <option value="Akademija dramske umjetnosti u Zagrebu">Akademija dramske umjetnosti u Zagrebu</option>
                            <option value="Akademija likovnih umjetnosti">Akademija likovnih umjetnosti</option>
                            <option value="Arhitektonski fakultet u Zagrebu">Arhitektonski fakultet u Zagrebu</option>
                            <option value="Edukacijsko-rehabilitacijski fakultet">Edukacijsko-rehabilitacijski fakultet</option>
                            <option value="Ekonomski fakultet u Zagrebu">Ekonomski fakultet u Zagrebu</option>
                            <option value="Fakultet elektrotehnike i računarstva">Fakultet elektrotehnike i računarstva</option>
                            <option value="Fakultet kemijskog inženjerstva i tehnologije u Zagrebu">Fakultet kemijskog inženjerstva i tehnologije u Zagrebu</option>
                            <option value="Fakultet političkih znanosti u Zagrebu">Fakultet političkih znanosti u Zagrebu</option>
                            <option value="Fakultet prometnih znanosti u Zagrebu">Fakultet prometnih znanosti u Zagrebu</option>
                            <option value="Fakultet strojarstva i brodogradnje">Fakultet strojarstva i brodogradnje</option>
                            <option value="Fakultet šumarstva i drvne tehnologije u Zagrebu">Fakultet šumarstva i drvne tehnologije u Zagrebu</option>
                            <option value="Farmaceutsko-biokemijski fakultet">Farmaceutsko-biokemijski fakultet</option>
                            <option value="Filozofski fakultet Družbe Isusove">Filozofski fakultet Družbe Isusove</option>
                            <option value="Filozofski fakultet">Filozofski fakultet</option>
                            <option value="Geodetski fakultet">Geodetski fakultet</option>
                            <option value="Građevinski fakultet">Građevinski fakultet</option>
                            <option value="Grafički fakultet">Grafički fakultet</option>
                            <option value="Hrvatska akademija znanosti i umjetnosti">Hrvatska akademija znanosti i umjetnosti</option>
                            <option value="Hrvatski studiji">Hrvatski studiji</option>
                            <option value="Katolički bogoslovni fakultet">Katolički bogoslovni fakultet</option>
                            <option value="Kineziološki fakultet">Kineziološki fakultet</option>
                            <option value="Medicinski fakultet u Zagrebu">Medicinski fakultet u Zagrebu</option>
                            <option value="Muzička akademija">Muzička akademija</option>
                            <option value="Pravni fakultet u Zagrebu">Pravni fakultet u Zagrebu</option>
                            <option value="Prehrambeno-biotehnološki fakultet">Prehrambeno-biotehnološki fakultet</option>
                            <option value="Prirodoslovno-matematički fakultet, Matematički odjel">Prirodoslovno-matematički fakultet, Matematički odjel</option>
                            <option value="Prirodoslovno-matematički fakultet u Zagrebu">Prirodoslovno-matematički fakultet u Zagrebu</option>
                            <option value="Rudarsko-geološko-naftni fakultet">Rudarsko-geološko-naftni fakultet</option>
                            <option value="Stomatološki fakultet">Stomatološki fakultet</option>
                            <option value="Tekstilno-tehnološki fakultet">Tekstilno-tehnološki fakultet</option>
                            <option value="Teološki fakultet Matija Vlačić Ilirik">Teološki fakultet Matija Vlačić Ilirik</option>
                            <option value="Učiteljski fakultet">Učiteljski fakultet</option>
                            <option value="Veterinarski fakultet u Zagrebu">Veterinarski fakultet u Zagrebu</option>
                        </select>
                    </div>
                    <div>
                        <label>Buddy:</label>
                            <input type='checkbox'
                            name="buddy"
                            value={formData.buddy}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Registriraj se</button>
                    <button type="button" onClick={onClose}>Odustani</button>
                </form>
                <div className="end-modal-bottom">
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;