import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { ORDER, getCookieValue } from "../../../utils/constants";
import "./navigationbar.css";

function Navigationbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
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
        } else {
          setIsLogin(true);
          console.log(response);
          console.log("Login ?:", isLogin);
          console.log("admin ?:", isAdmin);

          const userRole = response.data.role;
          if (userRole && userRole.includes("admin")) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    verifyLogin();
  }, []);

  const handleLogOut = () => {
    try {
      const token = "";
      document.cookie = `access_token=${token}; path=/`;
      alert("Đăng xuất thành công");
      window.location.href = "/";
      window.location.reload();
      setIsLogin(false);
      setIsAdmin(false);
    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  };

  const navigationBarDesktop = (
    <div>
      <nav>
        <ul className="Nav">
          <Link to="/" className="logo">
            LOGO
          </Link>
          <li>
            <Link to="/phim" className="nav11">
              Phim
            </Link>
          </li>
          {isLogin ? (
            <>
              {isAdmin ? (
                <>
                  <li>
                    <Link to="/mag" className="nav11">
                      Quan ly KH
                    </Link>
                  </li>
                  <li>
                    <Link to="/addphim" className="nav11">
                      ADD Film
                    </Link>
                  </li>
                  <li>
                    <Link to="/sukien" className="nav11">
                      EVENT
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/sukien" className="nav11">
                      EVENT
                    </Link>
                  </li>
                  <li>
                    <Link to="/hoso" className="nav11">
                      HO SO
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link className="nav11" onClick={handleLogOut}>
                  Đăng xuất
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sukien" className="nav11">
                  EVENT
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav11">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav11">
                  Đăng ký
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );

  return <div>{navigationBarDesktop}</div>;
}

export default Navigationbar;
