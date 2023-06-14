import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Route, Routes, Navigate } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import { createContext, useReducer } from "react";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";

(async function () {
  // we need less for antd global less variable and them customization.
  // note that cra dont support less by default so i needed to customize
  // webpack config.
  await import("./styles/app.less");
  // we need this because we all know that sass is way cooler than less.
  await import("./styles/app.scss");
})();

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("token")),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const token = "Token " + action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Routes>
        <Route
          path="/login"
          element={
            state.isAuthenticated ? <Navigate replace to="/" /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={state.isAuthenticated ? <Navigate replace to="/"/> : <RegisterPage/>}
        />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route
          path="/user"
          element={
            state.isAuthenticated ? (
              <UserPage />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
