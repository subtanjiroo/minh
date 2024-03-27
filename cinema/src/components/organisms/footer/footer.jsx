import React from "react";
import "./footer.css";
function Footer() {
  return (
    <div>
      {/* footer */}
      <footer>
        <div class="footer-content">
          <div class="footer-logo">
            <h2>CGV</h2>
          </div>
          <div class="footer-links">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Phim</a>
              </li>
              <li>
                <a href="#">Lien He</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div class="footer-social">
            <a href="#" target="_blank">
              <img src="facebook-icon.png" alt="F"></img>
            </a>
            <a href="#" target="_blank">
              <img src="twitter-icon.png" alt="X"></img>
            </a>
            <a href="#" target="_blank">
              <img src="instagram-icon.png" alt="Ins"></img>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
