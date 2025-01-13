import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckLogin from './Components/Check_login/CheckLogin';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Guides from './Components/Guides/Guides';
import Mapa from './Components/Mapa/Mapa';
import Title from './Components/Title/Title';
import Expiriences from './Components/Expiriences/Expiriences';
import Domovi from './Pages/Domovi/Domovi';
import Domovi_Info from './Pages/Domovi/Info';
import Faks from './Pages/Fakulteti/Faks';
import Faks_Info from './Pages/Fakulteti/Info';
import Prijevoz from './Pages/JavniPrijevoz/JavniPrijevoz';
import Prijevoz_Info from './Pages/JavniPrijevoz/Info';
import Menze from './Pages/Menze/Menze';
import Forum from './Pages/Forum/forum';
import Menze_Info from './Pages/Menze/Info';
import Buddy from './Pages/Buddy/Buddy';
import Buddy_Info from './Pages/Buddy/Info';
import Profil from './Pages/Profil/Profil';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import { AppStateProvider } from './context/AppStateProvider';
import Profil_Header from './Pages/Profil/ProfilHeader'

const App = () => {
  return (
    <AppStateProvider>
      <CheckLogin />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Profil" element={<Profil_Header />} />
          <Route path="/Domovi" element={<Domovi />} />
          <Route path="/Fakulteti" element={<Faks />} />
          <Route path="/JavniPrijevoz" element={<Prijevoz />} />
          <Route path="/Menze" element={<Menze />} />
          <Route path="/Buddy" element={<Buddy />} />
          <Route path="/Forum" element={<Forum />} />
          </Routes>
          <div className="container">
            <Routes>
              <Route path="/" element={
                <React.Fragment>
                  <Guides />
                  <Mapa />
                  <Title subTitle='ISKUSTVA' title='Što kažu studenti' />
                  <Expiriences />
                  <Title subTitle='KONTAKTIRAJ NAS' title='Trebaš pomoć?' />
                  <Contact />
                </React.Fragment>
              }/>
              <Route path="/Profil" element={<Profil />} />
              <Route path="/Domovi" element={<Domovi_Info />} />
              <Route path="/Fakulteti" element={<Faks_Info />} />
              <Route path="/JavniPrijevoz" element={<Prijevoz_Info />} />
              <Route path="/Menze" element={<Menze_Info />} />
              <Route path="/Buddy" element={<Buddy_Info />} />
            </Routes>
            <Footer />
          </div>
      </Router>
      </AppStateProvider>
  )
}

export default App