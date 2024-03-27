import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./sukien.css";

function SuKien() {
  return (
    <div className="container">
      <Carousel className="custom-carousel" pause="hover" interval={5000}>
        <Carousel.Item>
          <a href="#">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQpZiQIERYvrQW4wBtcuR0nWaeHoM5e505A&usqp=CAU"
              className="d-block w-100"
              alt="First slide"
            />
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <a href="#">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQpZiQIERYvrQW4wBtcuR0nWaeHoM5e505A&usqp=CAU"
              className="d-block w-100"
              alt="Second slide"
            />
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <a href="#">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQpZiQIERYvrQW4wBtcuR0nWaeHoM5e505A&usqp=CAU"
              className="d-block w-100"
              alt="Third slide"
            />
          </a>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SuKien;
