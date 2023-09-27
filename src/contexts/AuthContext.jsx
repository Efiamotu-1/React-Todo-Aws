import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "verify":
      return {...state, isAuthenticated: true}  
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(user) {
    // if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: user });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  function verify() {
    dispatch({ type: "verify" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, verify, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };