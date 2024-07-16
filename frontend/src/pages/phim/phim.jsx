import React, { useEffect, useState } from "react";
import { ORDER } from "../../utils/constants";
import "./phim.css";
import axios from "axios";
function Phim() {
  const [dataMovie, setdataMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ giá trị tìm kiếm
  const filteredMovies = dataMovie.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);
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

  const totalPages = Math.ceil(dataMovie.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((curPage) => Math.max(curPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((curPage) => Math.min(curPage + 1, totalPages));
  };

  const handleChangePage = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  const handleInputBlur = () => {
    if (currentPage === "") {
      setCurrentPage(1);
    }
  };
  const locationing = (dataMovie) => {
    window.location.href = `phimIF?id=${dataMovie._id}`;
  };

  return (
    <div style={{ maxHeight: "100%", height: "auto", overflow: "hidden" }}>
      <div className="search">
          <input
            type="text"
            className="SS"
            name="search"
            placeholder="Tìm kiếm tên phim..."
            value={searchTerm}
            style={{position:"relative",top:"-10px",bottom:"30px"}}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      <div className="list1">
      {filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (     
            <div className="movie" key={item.id}>
              <img
                src={item.img}
                alt={item.title}
                onClick={() => locationing(item)}
              />
              <a
                style={{ cursor: "pointer" }}
                onClick={() => locationing(item)}
                className="movie-info"
              >
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </a>
            </div>
      ))}
      </div>
      <div className="PaN">
        <button className="Pre" onClick={handlePrevClick}>
          Prev
        </button>
        <input
          style={{ width: "50px" }}
          type="text"
          className="Current"
          value={currentPage}
          onChange={handleChangePage}
          onBlur={handleInputBlur}
          min={1}
          max={totalPages}
        />
        <button className="Next" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Phim;
