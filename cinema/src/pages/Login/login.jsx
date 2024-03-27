import React, { useEffect, useState } from "react";
import "./login.css";
import { ORDER, getCookieValue } from "../../utils/constants"; // Import getCookieValue
import axios from "axios";

function LoginC() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL + ORDER.getCilent}`,
        {
          dataRequest: { email: email, password: password },
        }
      );

      if (response.data.code === 200) {
        alert(response.data.mesg);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.accessToken}`;
        document.cookie = `access_token=Bearer ${response.data.data.accessToken}; path=/`;
        window.location.href = "/";
      } else {
        alert(response.data.data.mesg);
        window.location.reload();
      }
    } catch (error) {
      alert("Đã có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL + ORDER.verifyLogin}`, {
        headers: { Authorization: getCookieValue("access_token") },
      })
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
          window.location.href = "/";
        }
      });
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>
        <div className="form-group">
          <label htmlFor="email">Tên đăng nhập</label>
          <input
            type="text"
            id="email"
            placeholder="Nhập tên đăng nhập"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu"
            required
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-login">
          Đăng nhập
        </button>
        <button
          className="btn-login"
          style={{ position: "relative", top: "10px" }}
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginC;
