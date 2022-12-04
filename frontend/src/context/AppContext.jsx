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
  console.log(authedUser);
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
    localStorage.setItem("token", jwt);
    localStorage.setItem("userData", JSON.stringify(authedUser));
  }, [jwt]);

  return (
    <AppContext.Provider value={{ setJwt, setAuthedUser, jwt, authedUser }}>
      {children}
    </AppContext.Provider>
  );
}
