import React from 'react';
import './Info.css';

const ZagrebBuddyInfo = () => {
  return (
    <div className="buddy-info-container">
      <h1>Buddy sustav u Zagrebu</h1>
      <p className="introB">
        Buddy sustav je inovativna značajka aplikacije koja povezuje nove studente s iskusnim 
        "buddyima" koji im mogu pomoći oko svih aspekata studentskog života u Zagrebu. Ovaj 
        sustav pruža personaliziranu podršku i olakšava prilagodbu na novi grad i akademsko okruženje.
      </p>
      
      <h2 className="h2B">Što je Buddy?</h2>
      <p>
        Buddy je iskusni student ili lokalni stanovnik koji dobrovoljno pomaže novim studentima. 
        Oni pružaju podršku, savjete i prijateljstvo, pomažući novim studentima da se lakše snađu 
        u novom okruženju.
      </p>

      <h2 className="h2B">Kako pronaći Buddyja?</h2>
      <ul>
        <li>Otvorite aplikaciju i idite na sekciju "Pronađi Buddyja"</li>
        <li>Postavite svoje preferencije (npr. područje studija, interesi, jezik)</li>
        <li>Pregledajte profile dostupnih Buddyja</li>
        <li>Pošaljite zahtjev za povezivanje s odabranim Buddyjem</li>
        <li>Čekajte potvrdu i započnite razgovor!</li>
      </ul>

      <h2 className="h2B">Kako Buddy može pomoći?</h2>
      <ul>
        <li>Orijentacija po gradu i kampusu</li>
        <li>Savjeti o studentskom životu, menzama i smještaju</li>
        <li>Pomoć oko administrativnih procedura (npr. upis, iksica)</li>
        <li>Informacije o javnom prijevozu i snalaženju po gradu</li>
        <li>Preporuke za društvene i kulturne događaje</li>
        <li>Jezična podrška za međunarodne studente</li>
      </ul>

      <h2 className="h2B">Prednosti Buddy sustava</h2>
      <ul>
        <li>Personalizirana podrška prilagođena vašim potrebama</li>
        <li>Brža i lakša prilagodba na novi grad i akademsko okruženje</li>
        <li>Mogućnost stvaranja novih prijateljstava</li>
        <li>Pristup lokalnim znanjima i "insajderskim" informacijama</li>
        <li>Poboljšanje jezičnih vještina (za međunarodne studente)</li>
      </ul>
      
      <h2 className="h2B">Savjeti za uspješno Buddy iskustvo</h2>
      <ul>
        <li>Budite otvoreni i spremni za nova iskustva</li>
        <li>Jasno komunicirajte svoje potrebe i očekivanja</li>
        <li>Poštujte vrijeme i trud svog Buddyja</li>
        <li>Budite proaktivni u postavljanju pitanja i traženju savjeta</li>
        <li>Razmotrite mogućnost da i sami postanete Buddy u budućnosti</li>
      </ul>

      <p>
        Buddy sustav je više od samo praktične pomoći - to je prilika za stvaranje 
        značajnih veza i obogaćivanje vašeg studentskog iskustva u Zagrebu. Bez obzira jeste 
        li novi u gradu ili tražite način da se više povežete sa studentskom zajednicom, 
        Buddy sustav vam može pomoći da se osjećate kao kod kuće.
      </p>

      <p className="note">
        Napomena: Dostupnost Buddyja može varirati ovisno o razdoblju godine i broju 
        volontera. Preporučuje se da započnete potragu za Buddyjem što ranije, posebno 
        ako ste novi student ili dolazite u Zagreb na početku akademske godine.
      </p>
    </div>
  );
};

export default ZagrebBuddyInfo;