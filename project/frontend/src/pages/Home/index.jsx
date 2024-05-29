import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import axios from "axios";
import { ORDER } from "../../utils/constants";
import { Link} from "react-router-dom";

function Home() {
  const [dataMovie, setdataMovie] = useState();
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL + ORDER.getMovie}`)
        .then((response) => {
          const dataResponse = response.data;
          if (dataResponse.code === 200) {
            setdataMovie(dataResponse.data);
          } else {
            alert("ko tim thay du lieu");
          }
        });
    } catch (error) {
      alert("da co loi say ra");
    }
  }, []);
  const dataDisplay = dataMovie
    ? dataMovie.slice(0, 3).map((item) => {
        return (
          <div className="moviee" key={item.id}>
            <img src={item.img} />
            <a href="#" className="moviee-infoo">
              <h4>{item.title}</h4>
              <div className="btnn" onClick={()=>{locationing(item.id)}}>Xem Chi Tiết Và Đặt Vé</div>
            </a>
          </div>
        );
      })
    : null;
    const locationing = (dataMovie) => {
      window.location.href = `PhimIF?id=${dataMovie}`;
  }
  
  return (
    <div
    style={{overflow:"hidden"}}
    >
      <div className="boxB">
        <div ><Link  className="box" to="/phim">Phim Dang Chieu</Link></div>
        <div className="box">Dac Trung CGV</div>
        <div className="box">Thue Rap va Ve Nhom</div>
        <div className="box">Lien He CGV</div>
        <div className="box">Tin Moi & Uu Dai</div>
        <div><Link  className="box" to="/register">Dang Ky Ngay</Link></div>
      </div>
      <div>
        <div className="containerrr">
          <Carousel className="custom-carousel" pause="hover" interval={5000}>
            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center h-100">
                <a href="#" className="d-block">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQpZiQIERYvrQW4wBtcuR0nWaeHoM5e505A&usqp=CAU"
                    className="img-fluid"
                    alt="Third slide"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </a>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center h-100">
                <a href="#" className="d-block">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQpZiQIERYvrQW4wBtcuR0nWaeHoM5e505A&usqp=CAU"
                    className="img-fluid"
                    alt="Third slide"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </a>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center h-100">
                <a href="#" className="d-block">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQpZiQIERYvrQW4wBtcuR0nWaeHoM5e505A&usqp=CAU"
                    className="img-fluid"
                    alt="Third slide"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </a>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="MS" style={{top:"20px",position:"relative"}}>
          Movie Selection
         
        </div>
        <div className="list">

          {dataDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
