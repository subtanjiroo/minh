import React, { useState, useEffect } from "react";
import axios from "axios";
import { ORDER } from "../../utils/constants";
import "./QLF.css";

function AddRoom() {
  const [dataMovie, setdataMovie] = useState([]);
  const [dataID, setDataID] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ giá trị tìm kiếm

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL + ORDER.getMovie}`)
        .then((response) => {
          const dataResponse = response.data;
          if (dataResponse.code === 200) {
            setdataMovie(dataResponse.data);
            console.log(dataResponse);
          } else {
            alert("Không tìm thấy dữ liệu");
          }
        });
    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }, []);

  const locationing = (dataMovie) => {
    window.location.href = `upPhim?id=${dataMovie._id}`;
  };


  const DeleteMovie = (id) => {
    const isConfirmed = window.confirm("Bạn chắc chắn muốn xóa?");
    if (isConfirmed) {
      setDataID(id);
    }
  };

  useEffect(() => {
    try {
      if (dataID) {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL + ORDER.DeleteMovie}`, {
            dataRequest: { _id: dataID },
          })
          .then((response) => {
            console.log(response);
            window.location.reload();
          });
      }
    } catch (error) {
      alert("Xóa thất bại");
    }
  }, [dataID]);

  // Hàm lọc danh sách phim dựa trên giá trị tìm kiếm
  const filteredMovies = dataMovie.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <div className="search">
          <input
            type="text"
            className="SS"
            name="search"
            placeholder="Tìm kiếm tên phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="textC">
          {filteredMovies.map((item, index) => (
            <div
             
              className="text"
              key={index}
            >
              <div className="title">{item.title}</div>
              <div className="B">
                <button
                  onClick={() => {
                    locationing(item);
                  }}
                  className="BB"
                >
                  Chỉnh Sửa
                </button>
                <button
                  onClick={() => {
                    DeleteMovie(item._id);
                  }}
                  className="BB"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
