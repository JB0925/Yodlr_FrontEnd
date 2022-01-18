import React, { useReducer, useContext, createContext } from "react";
import yodlrReducer from "./yodlrReducer";

const UserContext = createContext();

/** UserProvider
 *
 * Creates a context provider for the application
 * and all of the components that use it.
 */
const UserProvider = ({ children }) => {
  const initialState = {
    allUsers: [],
  };

  const [state, dispatch] = useReducer(yodlrReducer, initialState);
  const value = [state, dispatch];

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * useUserContext
 *
 * A hook that makes a streamlined way to get the state and dispatch
 * from useReducer. If this function is not called from components that
 * are wrapped inside of a UserProvider, it will throw an error.
 */
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used from within a UserProvider.");
  }

  return context;
};

export { UserProvider, useUserContext };
