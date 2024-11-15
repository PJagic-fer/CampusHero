import React from 'react';
import './Info.css';

const ZagrebFacultiesInfo = () => {
  return (
    <div className="faculties-info-container">
      <p className="introF">
        Zagreb, kao glavni grad Hrvatske, dom je brojnim prestižnim fakultetima koji nude širok spektar studijskih programa. 
        Ovi fakulteti ne samo da pružaju visokokvalitetno obrazovanje, već i stvaraju okruženje za inovacije, istraživanja i osobni razvoj studenata.
      </p>
      
      <h2 className="h2F">Što je potrebno za upis na fakultet?</h2>
      <ul>
        <li>Završena srednja škola i položena državna matura</li>
        <li>Prijava putem sustava Postani Student (www.postani-student.hr)</li>
        <li>Ispunjavanje specifičnih uvjeta pojedinog fakulteta (npr. dodatne provjere znanja, vještina ili sposobnosti)</li>
        <li>Dokumenti: svjedodžbe srednje škole, rodni list, domovnica, fotografije</li>
        <li>Plaćanje upisnine (iznos varira ovisno o fakultetu)</li>
      </ul>

      <h2 className="h2F">Povezanost fakulteta s gradom</h2>
      <p>
        Većina fakulteta u Zagrebu smještena je u širem centru grada ili u blizini važnih gradskih točaka. 
        Dobro su povezani javnim prijevozom, što studentima omogućuje lak pristup ne samo obrazovnim institucijama, 
        već i brojnim kulturnim, zabavnim i sportskim sadržajima koje Zagreb nudi.
      </p>

      <h2 className="h2F">Dodatne informacije</h2>
      <p>
        Zagrebački fakulteti nude razne pogodnosti i mogućnosti za studente, uključujući:
      </p>
      <ul>
        <li>Moderne knjižnice i računalne učionice</li>
        <li>Mogućnosti za sudjelovanje u istraživačkim projektima</li>
        <li>Programi studentske razmjene (Erasmus+)</li>
        <li>Studentske udruge i klubovi</li>
        <li>Sportske aktivnosti i natjecanja</li>
        <li>Stručna praksa i suradnja s industrijom</li>
      </ul>
      
      <p>
        Studiranje u Zagrebu pruža jedinstveno iskustvo koje kombinira akademsku izvrsnost s bogatim gradskim životom. 
        To je prilika za stjecanje vrhunskog obrazovanja, stvaranje mreže kontakata i osobni rast u dinamičnom i 
        inspirativnom okruženju glavnog grada.
      </p>

      <p className="note">
        Napomena: Uvjeti za upis i specifični zahtjevi mogu se razlikovati od fakulteta do fakulteta i mijenjati iz godine u godinu. 
        Za najnovije i točne informacije, preporučuje se kontaktirati željeni fakultet ili posjetiti njihovu službenu web stranicu.
      </p>
    </div>
  );
};

export default ZagrebFacultiesInfo;