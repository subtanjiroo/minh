import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { ORDER, getCookieValue } from "../../utils/constants";
import "./Addphim.css";

function Addphim() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [addphim, setaddphim] = useState({
    title: "",
    category: "",
    description: "",
    releaseDate: "",
    time: "",
    actors: "",
    author: "",
    img: "",
  });
  const handleAddMovie = async (e) => {
    e.preventDefault();
    console.log(addphim);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL + ORDER.addMovie}`,
        { dataRequest: { ...addphim } }
      );
      if (response.data.code === 200) {
        alert(response.data.mesg);
        window.location.href = "/login";
      } else if (response.data.code === 300) {
        alert(response.data.mesg);
      } else if (response.data.code === 400) {
        alert(response.data.mesg);
      } else if (response.data.code === 500) {
        alert(response.data.mesg);
      }
    } catch (error) {
      alert("error");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setaddphim({
      ...addphim,
      [name]: value,
    });
  };
  useEffect(() => {
    //verify xem nguoi dung co phai admin khong
    const verifyLogin = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL + ORDER.verifyLogin}`,
          {
            headers: { Authorization: getCookieValue("access_token") },
          }
        );
        if (response.data.code === 200 || response.data.code === 401) {
          setIsLogin(false);
          alert("!!!login first!!!");
          window.location.href = "/login";
        } else {
          setIsLogin(true);

          const userRole = response.data.role;
          if (userRole && userRole.includes("admin")) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            alert("!!!admin require!!!");
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    verifyLogin();
  }, []);
  return <div>aaaaaaaaaaaaaaaa</div>;
}

export default Addphim;
