import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./Home.css";
import axios from "axios";
import { ORDER } from "../../utils/constants";

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
          <div className="movie" key={item.id}>
            <img src={item.img} style={{ height: "200px", width: "25vw" }} />
            <a href="#" className="movie-info">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </a>
          </div>
        );
      })
    : null;
  return (
    <div>
      <div className="boxB">
        <div className="box">Chon Rap</div>
        <div className="box">Phim Dang Chieu</div>
        <div className="box">Dac Trung CGV</div>
        <div className="box">Thue Rap va Ve Nhom</div>
        <div className="box">Lien He CGV</div>
        <div className="box">Tin Moi & Uu Dai</div>
        <div className="box">Dang Ky Ngay</div>
      </div>
      <div>
        <div className="container">
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
        <div className="MS">
          Movie Selection
          <hr
            style={{
              position: "absolute",
              top: "410px",
              width: "100vw",
              height: "2px",
              backgroundcolor: "black",
            }}
          ></hr>
        </div>
        <div className="list">
          {/* <div class="movie">
            <img src="https://placekitten.com/800/400" alt="Movie 1"></img>
            <a href="#" class="movie-info">
              <h3>{phim1.name}</h3>
              <p>{phim1.dt}</p>
            </a>
          </div>
          <div class="movie">
            <img src="https://placekitten.com/800/401" alt="Movie 2"></img>
            <a href="#" class="movie-info">
              <h3>{phim2.name}</h3>
              <p>{phim2.dt}</p>
            </a>
          </div>
          <div class="movie">
            <img src="https://placekitten.com/800/402" alt="Movie 3"></img>
            <a href="#" class="movie-info">
              <h3>{phim3.name}</h3>
              <p>{phim3.dt}</p>
            </a>
          </div> */}

          {dataDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
