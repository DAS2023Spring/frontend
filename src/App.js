import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";

(async function () {
  // we need less for antd global less variable and them customization.
  // note that cra dont support less by default so i needed to customize
  // webpack config.
  await import("./styles/app.less");
  // we need this because we all know that sass is way cooler than less.
  await import("./styles/app.scss");
})();

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
