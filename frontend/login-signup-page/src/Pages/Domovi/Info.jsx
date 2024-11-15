import React from 'react';
import './Info.css';

const ZagrebDormsInfo = () => {
  return (
    <div className="dorms-info-container">
      <p className="introD">
        Studentski domovi u Zagrebu pružaju pristupačan smještaj za studente koji studiraju na zagrebačkim fakultetima. 
        Ovi domovi ne samo da osiguravaju krov nad glavom, već i stvaraju jedinstveno okruženje za učenje, druženje i osobni razvoj.
      </p>
      
      <h2 className="h2D">Što je potrebno za upis u studentski dom?</h2>
      <ul>
        <li>Status redovitog studenta na nekom od zagrebačkih fakulteta</li>
        <li>Prijava na natječaj za smještaj u studentskom domu (obično se objavljuje u srpnju)</li>
        <li>Dokaz o primanjima članova obitelji (za određivanje prava na subvencionirani smještaj)</li>
        <li>Potvrda o prebivalištu izvan Zagreba</li>
        <li>Potvrda o uspjehu na studiju (prosjek ocjena i broj ostvarenih ECTS bodova)</li>
      </ul>

      <h2 className="h2D">Povezanost domova s gradom</h2>
      <p>
        Većina studentskih domova u Zagrebu dobro je povezana s centrom grada i fakultetima putem javnog prijevoza. 
        Tramvajske i autobusne linije prolaze u blizini svih većih studentskih naselja, omogućujući studentima lak pristup 
        obrazovnim institucijama, knjižnicama, trgovinama i kulturnim sadržajima.
      </p>

      <h2 className="h2D">Dodatne informacije</h2>
      <p>
        Studentski domovi u Zagrebu nude različite sadržaje koji mogu uključivati:
      </p>
      <ul>
        <li>Menze s subvencioniranom prehranom</li>
        <li>Sportske terene (košarka, nogomet, teretane)</li>
        <li>Učionice i prostorije za učenje</li>
        <li>Praonice rublja</li>
        <li>Wi-Fi mrežu</li>
        <li>Studentske klubove i društvene prostorije</li>
      </ul>
      
      <p>
        Život u studentskom domu pruža jedinstveno iskustvo koje mnogim studentima ostaje u sjećanju dugo nakon završetka studija. 
        To je prilika za stvaranje novih prijateljstava, razmjenu znanja i iskustava s kolegama iz različitih područja studija, 
        te razvijanje samostalnosti i životnih vještina.
      </p>

      <p className="note">
        Napomena: Uvjeti za upis i dostupnost smještaja mogu se mijenjati iz godine u godinu. 
        Za najnovije informacije, preporučuje se kontaktirati Studentski centar Zagreb ili posjetiti njihovu službenu web stranicu.
      </p>
    </div>
  );
};

export default ZagrebDormsInfo;