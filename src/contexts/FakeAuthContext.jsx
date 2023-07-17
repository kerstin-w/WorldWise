import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage: "",
};

/**
 * The reducer function handles different actions and updates the state accordingly in a React
 * application.
 * @returns The reducer function is returning a new state object based on the action type.
 */
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "loginError":
      return {
        ...state,
        errorMessage: "Invalid email or password",
      };
    case "logout":
      return {
        initialState,
      };
    default:
      throw new Error("Unkown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

/**
 * The AuthProvider function is a React component that provides authentication functionality to its
 * child components.
 * @returns The AuthProvider component is returning the AuthContext.Provider component with a value
 * prop that contains the user, isAuthenticated, login, logout, and errorMessage values. The children
 * prop is also being rendered as the child components of the AuthContext.Provider component.
 */
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  /**
   * The login function checks if the provided email and password match a fake user's credentials and
   * dispatches an action accordingly.
   */
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: { user: FAKE_USER } });
    } else {
      dispatch({ type: "loginError" });
    }
  }

  /**
   * The function "logout" dispatches an action of type "logout".
   */
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * The useAuth function is a custom hook that returns the authentication context from the AuthContext.
 * @returns The `useAuth` function returns the `context` object obtained from the `useContext` hook.
 */
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
