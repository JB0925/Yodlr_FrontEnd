import React, { useReducer, useContext, createContext } from "react";
import yodlrReducer from "./yodlrReducer";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initialState = {
    allUsers: [],
  };

  const [state, dispatch] = useReducer(yodlrReducer, initialState);
  const value = [state, dispatch];

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used from within a UserProvider.");
  }

  return context;
};

export { UserProvider, useUserContext };
