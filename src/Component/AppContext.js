import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        let response = await axios.get("/token");
        console.log("res", response.data.user);
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    verify();
  }, []);

  return (
    <AppContext.Provider value={{ isLogged: user !== null, setUser, user }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
