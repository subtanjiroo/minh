import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./sukien.css";

function SuKien() {
  return (
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
  );
}

export default SuKien;
