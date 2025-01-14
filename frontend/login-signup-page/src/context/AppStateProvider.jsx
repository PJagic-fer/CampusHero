import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

//korisnik se sprema u kontekst aplikacije
export const AppStateContext = createContext({
    user : {},
    setUser: (user) => {}
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

    //AppState provider se omotava oko djece i predaje im korisnika u kontekstu
    return (
        <AppStateContext.Provider value={{ user, setUser}}>
            {children}
        </AppStateContext.Provider>
    );
};

AppStateProvider.propTypes = {
    children: PropTypes.node
}

