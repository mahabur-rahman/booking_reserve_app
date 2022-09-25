import { createContext, useEffect, useReducer } from "react";

// initial state
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// create context
export const AuthContext = createContext(INITIAL_STATE);

// Reducer
const AuthReducer = (state, action) => {
  switch (action.type) {
    // login case
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// CONTEXT PROVIDER
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //   user saved on localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
