import { createContext, useContext, useReducer, useEffect } from "react";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, navbarBgColor: action.payload };
    case "SIGN_IN":
      return { ...state, user: action.payload };
      case "AUTH_CHANGE":
        return {...state, authChange:true}
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    navbarBgColor: "#ccc",
    authChange:false
  });

  
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
