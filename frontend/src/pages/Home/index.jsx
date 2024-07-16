import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import axios from "axios";
import { ORDER } from "../../utils/constants";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            console.log("api connected")
          } else {
            alert("Không tìm thấy dữ liệu");
          }
        });
    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const dataDisplay = dataMovie
    ? dataMovie.slice(0, 7).map((item) => (
        <div className="moviee" key={item.id}>
          <img src={item.img} alt={item.title} />
          <a href="#" className="moviee-infoo">
            <h4>{item.title}</h4>
            <div className="btnn" onClick={() => locationing(item.id)}>
              Xem Chi Tiết Và Đặt Vé
            </div>
          </a>
        </div>
      ))
    : null;

  const locationing = (movieId) => {
    window.location.href = `PhimIF?id=${movieId}`;
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="boxB">
        <div>
          <Link className="box" to="/phim">
            Phim Đang Chiếu
          </Link>
        </div>
        <div className="box">Đặc Trưng CGV</div>
        <div className="box">Thuê Rạp và Vé Nhóm</div>
        <div className="box">Liên Hệ CGV</div>
        <div className="box">Tin Mới & Ưu Đãi</div>
        <div>
          <Link className="box" to="/register">
            Đăng Ký Ngay
          </Link>
        </div>
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
                    alt="Slider Image 1"
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
                    alt="Slider Image 2"
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
                    alt="Slider Image 3"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </a>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="MS" style={{ top: "20px", position: "relative" }}>
          Movie Selection
        </div>
        <div className="list">
          <Slider {...settings}>{dataDisplay}</Slider>
        </div>
      </div>
    </div>
  );
}

export default Home;
