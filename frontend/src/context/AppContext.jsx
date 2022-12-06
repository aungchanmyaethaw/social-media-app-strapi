import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState("");
  const [authedUser, setAuthedUser] = useState({});

  //  Auth

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token != null && userData != null) {
      setJwt(token);
      setAuthedUser(userData);
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (jwt != "" && authedUser != {}) {
      localStorage.setItem("token", jwt);
      localStorage.setItem("userData", JSON.stringify(authedUser));
    }
  }, [jwt]);

  const handleJwt = (jwt) => {
    setJwt(jwt);
  };

  const handleAuthedUser = (user) => {
    setAuthedUser(user);
  };

  return (
    <AppContext.Provider
      value={{ handleJwt, handleAuthedUser, jwt, authedUser }}
    >
      {children}
    </AppContext.Provider>
  );
}
