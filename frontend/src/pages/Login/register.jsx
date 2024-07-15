import React, { useState, useEffect, useCallback } from "react";
import "./register.css";
import { ORDER, getCookieValue } from "../../utils/constants";
import axios from "axios";

function RegisterC() {
  const [isLogin, setIsLogin] = useState(false);
  const [CilentIF, setCilentIF] = useState({
    name: "",
    email: "",
    phone_number: "",
    BoD: Date,
    address: "",
    password: "",
    role: ["client"],
  });

  const saveToSessionStorage = useCallback(() => {
    const { password, role, ...clientInfoWithoutSensitive } = CilentIF;
    sessionStorage.setItem('CS', JSON.stringify(clientInfoWithoutSensitive));
  }, [CilentIF]);

 
  useEffect(() => {
    const savedData = sessionStorage.getItem('CS');
    if (savedData) {
      setCilentIF(JSON.parse(savedData));
    }
  }, []);


  useEffect(() => {
    saveToSessionStorage();
  }, [CilentIF, saveToSessionStorage]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL + ORDER.addCilent}`,
        { dataRequest: { ...CilentIF } }
      );
      if (response.data.code === 200) {
        alert(response.data.mesg);
        window.location.href = "/login";
      } else if (response.data.code === 300) {
        alert(response.data.mesg);
      } else if (response.data.code === 400) {
        alert(response.data.mesg);
      } else if (response.data.code === 401) {
        alert(response.data.mesg);
      } else if (response.data.code === 500) {
        alert(response.data.mesg);
      }
    } catch (error) {
      alert("Error occurred while registering.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCilentIF({
      ...CilentIF,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL + ORDER.verifyLogin}`, {
        headers: { Authorization: getCookieValue("access_token") },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("Error verifying login:", error);
      });
  }, []);

  return (
    <div>
      <form className="registration-formm" onSubmit={handleRegister}>
        <h2>Registration Form</h2>
        <label htmlFor="name"> Name:</label>
        <input
          type="text"
          value={CilentIF.name}
          id="name"
          name="name"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={CilentIF.email}
          id="email"
          name="email"
          onChange={handleChange}
          required
        />

        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="tel"
          value={CilentIF.phone_number}
          id="phone_number"
          name="phone_number"
          onChange={handleChange}
          required
        />

        <label htmlFor="BoD"> BirthDay:</label>
        <input
          type="date"
          value={CilentIF.BoD}
          id="BoD"
          name="BoD"
          onChange={handleChange}
          required
        />

        <label htmlFor="address"> Address:</label>
        <input
          type="text"
          value={CilentIF.address}
          id="address"
          name="address"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={CilentIF.password}
          id="password"
          name="password"
          onChange={handleChange}
          required
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default RegisterC;
