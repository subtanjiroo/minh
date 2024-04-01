import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Phim from "./pages/phim/phim";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login/login";
import Nnavigationbar from "./components/organisms/navigationbar/nnavigationbar";
import SuKien from "./pages/sukien/sukien";
import Footer from "./components/organisms/footer/footer";
import Register from "./pages/Login/register";
import PhimIF from "./pages/PhimIF/PhimIF";
import Addphim from "./pages/Createphim/Addphim";
function App() {
  return (
    <div>
      <header>
        <Nnavigationbar />
      </header>
      <body style={{ display: "flex", justifyContent: "center" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="phim" element={<Phim />} />
          <Route path="addphim" element={<Addphim />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="sukien" element={<SuKien />} />
          <Route path="phimIF" element={<PhimIF />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
