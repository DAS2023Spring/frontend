import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import { createContext, useReducer } from "react";

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
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload)
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
