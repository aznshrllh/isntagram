import { useState, createContext } from "react";

export const AuthContextProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext({
  signedIn: false,
  setSignedIn: () => {},
});
