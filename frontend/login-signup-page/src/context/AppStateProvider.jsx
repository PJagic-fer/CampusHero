import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

//korisnik se sprema u kontekst aplikacije
export const AppStateContext = createContext({
    user : {},
    setUser: (user) => {},
    fetch_path : ""
});


export const AppStateProvider = ({children}) => {
    const [user, setUser] = useState({
        name: null,
        surname: null,
        email: null,
        jmbag: null,
        city: null,
        studentHome: null,
        faculty: null,
        isBuddy: Boolean(false),
        buddy: null,
        isAdmin: Boolean(false)
    });
    //const fetch_path = "https://campus-hero.onrender.com/campus-hero";
    const fetch_path = "http://localhost:8080/campus-hero";

    //AppState provider se omotava oko djece i predaje im korisnika u kontekstu
    return (
        <AppStateContext.Provider value={{ user, setUser, fetch_path}}>
            {children}
        </AppStateContext.Provider>
    );
};

AppStateProvider.propTypes = {
    children: PropTypes.node
}

