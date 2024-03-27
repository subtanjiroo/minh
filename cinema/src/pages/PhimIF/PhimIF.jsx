import React, { useState, useEffect } from "react";
import "./phimIF.css";
import axios from "axios";
import { ORDER } from "../../utils/constants";

function PhimIF() {
  const [phim, setPhim] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL + ORDER.getMovie}?filter=${id}`
        )
        .then((response) => {
          const dataResponse = response.data;
          if (dataResponse.code === 200) {
            setPhim(dataResponse.data);
            console.log(phim);
          } else {
            alert("Không tìm thấy dữ liệu");
          }
        });
    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }, []);

  return (
    <div>
      {phim ? (
        <div>
          <h1>{phim.title}</h1>
          <p>{phim.description}</p>
          <img src={phim.img}></img>
          <p>{phim.actors}</p>
          <p>{phim.author}</p>
          <p>{phim.time}</p>
          <p>{phim.category}</p>
          <p>{phim.releaseDate}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
}

export default PhimIF;
