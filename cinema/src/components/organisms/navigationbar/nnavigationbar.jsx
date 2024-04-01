import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { ORDER, getCookieValue } from "../../../utils/constants";
import "./nnavigationbar.css";
import { BoxIcon } from "boxicons";

function Nnavigationbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State để điều khiển hiển thị MenuSideBar
  const [loaded, setloaded] = useState(0);
  useEffect(() => {
    // Effect hook để kiểm tra đăng nhập và vai trò của người dùng
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
    // Xử lý đăng xuất
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

  const toggleMenu = () => {
    // Xử lý khi nhấn nút Menu để hiển thị hoặc ẩn MenuSideBar
    if (loaded === 0) {
      setloaded(1);
    }
    setShowMenu(!showMenu);
  };
  console.log(loaded);

  const MenuSideBar = () => {
    return (
      <div
        className={`popup ${showMenu ? "show" : loaded === 1 ? "hide" : ""}`}
      >
        <span
          onClick={toggleMenu}
          style={{ fontSize: "20px", padding: "10px", cursor: "pointer" }}
        >
          X
        </span>
        <div className="ND1">
          <ul>
            <li className="nav12">
              <Link to="/addphim">ADD Movie</Link>
            </li>
            <li className="nav12">
              <Link to="/hoso">HO SO</Link>
            </li>
            <li className="nav12">
              <Link to="/magC">QL KH</Link>
            </li>
            <li className="nav12">
              <Link to="/magM">QL Movie</Link>
            </li>
            <li className="nav12">
              <Link onClick={handleLogOut}>Đăng xuất</Link>
            </li>
          </ul>
        </div>
      </div>
    );
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
              <li className="nav11" onClick={toggleMenu}>
                Menu
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
        <MenuSideBar />
      </nav>

      <Outlet />
    </div>
  );

  return <div>{navigationBarDesktop}</div>;
}

export default Nnavigationbar;
