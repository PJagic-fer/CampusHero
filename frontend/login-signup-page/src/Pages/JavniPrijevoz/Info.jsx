import React from 'react';
import './Info.css';

const ZagrebPublicTransportInfo = () => {
  return (
    <div className="public-transport-info-container">
      <p className="introP">
        Javni prijevoz u Zagrebu obuhvaća mrežu tramvaja, autobusa i vlakova, pružajući učinkovit 
        način kretanja gradom. Sustav kojim upravlja ZET (Zagrebački električni tramvaj) povezuje 
        sve dijelove grada i okolice, čineći Zagreb pristupačnim i za stanovnike i za posjetitelje.
      </p>
      
      <h2 className="h2P">Kako i gdje kupiti karte za javni prijevoz?</h2>
      <ul>
        <li>Kiosci: Tisak, iNovine i drugi</li>
        <li>ZET-ove prodajne jedinice</li>
        <li>Automati na većim tramvajskim stajalištima</li>
        <li>Putem mobilne aplikacije ZET</li>
        <li>SMS kupovina (poslati "ZET" na 6717 za jednokratnu kartu)</li>
      </ul>

      <h2 className="h2P">Vrste karata i pokaza</h2>
      <ul>
        <li>Jednokratna karta (30 min): vrijedi za jednu vožnju u jednom smjeru</li>
        <li>Dnevna karta: neograničen broj vožnji unutar 24 sata</li>
        <li>Višednevne karte: 3, 7, 15 ili 30 dana</li>
        <li>Mjesečni i godišnji pokazi: za redovite korisnike</li>
        <li>Studentski pokaz: subvencionirani mjesečni ili godišnji pokaz za studente</li>
      </ul>

      <h2 className="h2P">Točnost i učestalost prijevoza</h2>
      <p>
        Tramvaji i autobusi u Zagrebu općenito su točni, s manjim odstupanjima tijekom vršnih sati. 
        Učestalost varira ovisno o liniji i dobu dana:
      </p>
      <ul>
        <li>Tramvaji: svakih 5-10 minuta tijekom dana, rjeđe navečer i vikendom</li>
        <li>Autobusi: svakih 10-20 minuta, ovisno o liniji i dobu dana</li>
        <li>Noćne linije: prometuju nakon ponoći, svakih 30-60 minuta</li>
      </ul>

      <h2 className="h2P">Dodatne informacije</h2>
      <ul>
        <li>Tramvajske linije označene su brojevima od 1 do 17</li>
        <li>Autobusne linije pokrivaju šire gradsko područje i prigradska naselja</li>
        <li>Gradsko-prigradska željeznica povezuje središte grada s okolnim mjestima</li>
        <li>Bicikli se mogu prevoziti u tramvajima i autobusima izvan vršnih sati</li>
        <li>ZET nudi besplatne vožnje za starije od 65 godina i osobe s invaliditetom</li>
      </ul>
      

      <p className="note">
        Napomena: Cijene karata i pokaza, kao i raspored vožnji, podložni su promjenama. 
        Za najnovije informacije, preporučuje se posjetiti službenu web stranicu ZET-a ili 
        koristiti njihovu mobilnu aplikaciju.
      </p>
    </div>
  );
};

export default ZagrebPublicTransportInfo;