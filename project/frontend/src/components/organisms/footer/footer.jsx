import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faInstagram,faXTwitter  } from '@fortawesome/free-brands-svg-icons'; // Import biểu tượng Facebook
import "./footer.css";
function Footer() {
  const [display,setDisplay] = useState(false);
useEffect(()=>{console.log(display)},[display])
  return (
    <div>
      {/* footer */}
      <footer>
        <div onClick={()=>{setDisplay(false)}} className={`Fp ${display ? "display" :"nonedisplay"}`}>
          <div className="Fp-content">
        <p style={{fontWeight:"bold"}}>  Chăm sóc khách hàng: </p>
        <p>  Hotline: 1900 6017 </p>
        <p>  Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết) </p>
        <p> Email hỗ trợ: hoidap@cgv.vn </p> 
        <p>Địa chỉ: Lầu 2, số 7/28, Đường Thành Thái, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
          </div>
        </div>
        <div class="footer-content">
          <div class="footer-logo">
            <h2>CGV</h2>
          </div>
          <div class="footer-links">
            <ul>
              <li className="trans">
              <Link to="/"><a >Home</a></Link>
              </li>
              <li className="trans">
              <Link to="/phim"><a>Phim</a></Link>
              </li>
              <li className="trans">
                <a onClick={()=>{setDisplay(!display)}}>Lien He</a>
              </li>
              <li className="DKSD trans">
                <div className="pop">
              <p>Điều khoản sử dụng</p>
              <p>Điều Khoản Chung</p>
              <p>Điều Khoản Giao Dịch</p>
              <p>Chính Sách Thanh Toán</p>
              <p>Chính Sách Bảo Mật</p>
              <p>Câu Hỏi Thường Gặp</p>
                </div>
                <a >Điều khoản sử dụng</a>
              </li>
            </ul>
          </div>
          <div class="footer-social">
            <a href="#" target="_blank">
            <FontAwesomeIcon  className="iconn" icon={faFacebook} />
            </a>
            <a href="#" target="_blank">
            <FontAwesomeIcon  className="iconn" icon={faXTwitter} />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon  className="iconn" icon={faInstagram} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
