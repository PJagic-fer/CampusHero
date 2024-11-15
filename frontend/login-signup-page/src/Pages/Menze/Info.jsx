import React from 'react';
import './Info.css';

const ZagrebCanteensInfo = () => {
  return (
    <div className="canteens-info-container">
      <p className="introM">
        Studentske menze u Zagrebu pružaju kvalitetnu i pristupačnu prehranu za studente. 
        Ovi objekti ne samo da nude raznovrsne obroke po subvencioniranim cijenama, već su i 
        važna mjesta studentskog okupljanja i socijalizacije.
      </p>
      
      <h2 className="h2M">Kako koristiti studentske menze?</h2>
      <ul>
        <li>Potrebna je važeća studentska iskaznica (iksica)</li>
        <li>Iksica se može nadoplatiti na blagajnama menzi ili putem e-Studenta</li>
        <li>Svaki student ima pravo na dva subvencionirana obroka dnevno</li>
        <li>Menze nude doručak, ručak i večeru u određenim terminima</li>
        <li>Plaćanje se vrši isključivo iksicama, gotovina nije prihvaćena</li>
      </ul>

      <h2 className="h2M">Popularne studentske menze u Zagrebu</h2>
      <ul>
        <li>Savska - najveća menza, poznata po raznovrsnoj ponudi</li>
        <li>SC - centralno smještena, često vrlo prometna</li>
        <li>Cvjetno naselje - moderna menza s ugodnim ambijentom</li>
        <li>FSB - popularna među studentima tehničkih fakulteta</li>
        <li>Ekonomija - prostrana menza s brzom uslugom</li>
      </ul>

      <h2 className="h2M">Radno vrijeme i ponuda</h2>
      <p>
        Radno vrijeme može varirati ovisno o menzi, ali općenito:
      </p>
      <ul>
        <li>Doručak: 07:00 - 10:00</li>
        <li>Ručak: 11:00 - 16:00</li>
        <li>Večera: 17:00 - 20:00</li>
      </ul>
      <p>
        Ponuda obično uključuje:
      </p>
      <ul>
        <li>Nekoliko vrsta glavnih jela (mesna i vegetarijanska opcija)</li>
        <li>Razne priloge (riža, krumpir, povrće)</li>
        <li>Juhe i salate</li>
        <li>Desert</li>
        <li>Bezalkoholna pića</li>
      </ul>

      <h2 className="h2M">Dodatne informacije</h2>
      <ul>
        <li>Cijene obroka su subvencionirane i znatno niže od tržišnih cijena</li>
        <li>Mnoge menze nude i opciju "za van"</li>
        <li>Jelovnici se obično mijenjaju na tjednoj bazi</li>
        <li>Neke menze imaju posebne ponude za vegetarijance i vegane</li>
        <li>Tijekom ispitnih rokova, neke menze imaju produženo radno vrijeme</li>
      </ul>
      
      <p>
        Korištenje studentskih menzi ne samo da je ekonomično, već i pruža priliku za druženje 
        s kolegama i stvaranje novih poznanstava. To je važan aspekt studentskog života koji 
        doprinosi cjelokupnom iskustvu studiranja u Zagrebu.
      </p>

      <p className="note">
        Napomena: Radno vrijeme, cijene i ponuda mogu se mijenjati. Za najnovije informacije, 
        preporučuje se provjeriti službenu web stranicu Studentskog centra Zagreb ili koristiti 
        aplikaciju za pregled jelovnika i stanja na iksici.
      </p>
    </div>
  );
};

export default ZagrebCanteensInfo;