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
import QLphim from "./pages/QLF/QLF"
import QLC from "./pages/QLC/QLC"
import UpdatePhim from "./pages/QLF/UpdatePhim";
import CIF from "./pages/QLC/CIF";
import HoSo from "./pages/HS/HoSo";
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
          <Route path="magP" element={<QLphim />} />
          <Route path="magC" element={<QLC />} />
          <Route path="HoSo" element={<HoSo />} />
          <Route path="CIF" element={<CIF />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="sukien" element={<SuKien />} />
          <Route path="phimIF" element={<PhimIF />} />
          <Route path="upPhim" element={<UpdatePhim />} />
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
