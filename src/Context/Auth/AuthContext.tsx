import React from "react";
import { createContext, useState, useEffect, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type AuthContext = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContext>({
  token: null,
  setToken: () => {},
  userName: "",
  setUserName: () => {}
});

const AuthContextProvider = ({ children }: Props) => {

  const getInitialToken = () =>
    localStorage.getItem("tkn") || sessionStorage.getItem("tkn");
  const getInitialUserName = () =>
    localStorage.getItem("name") || sessionStorage.getItem("name");

  const [token, setToken] = useState<string | null>(getInitialToken);
  const [userName, setUserName] = useState<string | null>(getInitialUserName);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("tkn");
      sessionStorage.removeItem("tkn");
    }
    if (!userName) {
      localStorage.removeItem("name");
      sessionStorage.removeItem("name");
    }
  }, [token, userName]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userName,
        setUserName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;