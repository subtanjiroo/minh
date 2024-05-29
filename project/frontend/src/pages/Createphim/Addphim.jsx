import React, { useEffect, useState } from "react";
import axios from "axios";
import { ORDER, getCookieValue } from "../../utils/constants";
import "./Addphim.css";


function Addphim() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rooms, setRooms] = useState([]);
const [newTime, setNewTime] = useState("");
const [selectedProvinces, setSelectedProvinces] = useState([]);
const VietnamProvinces = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Hải Phòng",
  "Đà Nẵng",
  "Cần Thơ",
  "Hà Giang",
  "Cao Bằng",
  "Lai Châu",
  "Lào Cai",
  "Hà Nam",
  "Hà Tĩnh",
  "Quảng Ninh",
  "Bắc Giang",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Bình Định",
  "Phú Yên",
  "Khánh Hòa",
  "Ninh Thuận",
  "Bình Thuận",
  "Kon Tum",
  "Gia Lai",
  "Đắk Lắk",
  "Đắk Nông",
  "Lâm Đồng",
  "Bình Phước",
  "Bình Dương",
  "Đồng Nai",
  "Tây Ninh"
];
  const [addphim, setAddphim] = useState({
    title: "",
    category: "",
    description: "",
    releaseDate: "",
    duration: "",
    actors: "",
    author: "",
    img: "",
    price:"",
    roomNumber:"",
    chinhanh: [],
    timeStart: [],
  });
  const [xuatChieu, setXuatChieu] = useState({
    date: "",
              time: [
                {
                  timeR: "",
                  seats: [],
                },
              ],    
  });

  const handleAddMovie = async (e) => {
    e.preventDefault();
    console.log(addphim)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL + ORDER.addMovie}`,
        { dataRequest: { ...addphim } }
      );
      if (response.data.code === 200) {
        alert(response.data.mesg);
      } else if (response.data.code === 300) {
        alert(response.data.mesg);
      } else if (response.data.code === 400) {
        alert(response.data.mesg);
      } else if (response.data.code === 500) {
        alert(response.data.mesg);
      }
    } catch (error) {
      alert("Error occurred while adding movie.");
    }
  };
  const handleSelectBranch = () => {
    if (selectedProvinces.length !== VietnamProvinces.length) {
      setSelectedProvinces([...VietnamProvinces]);
      setAddphim({
        ...addphim,
        chinhanh: [...VietnamProvinces],
      });
    } else {
      setSelectedProvinces([]);
      setAddphim({
        ...addphim,
        chinhanh: [],
      });
    }
  };
  
  const handleChangeP = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedProvinces([...selectedProvinces, value]);
      setAddphim({
        ...addphim,
        chinhanh: [...selectedProvinces, value],
      });
    } else {
      setSelectedProvinces(selectedProvinces.filter((province) => province !== value));
      setAddphim({
        ...addphim,
        chinhanh: selectedProvinces.filter((province) => province !== value),
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddphim({
      ...addphim,
      [name]: value,
    });
  };
  const RoM = (roomNumber) => {
    setAddphim({
      ...addphim,
      roomNumber: roomNumber,
    });
  };
  const handleXuatChieuChange = (e) => {
    const { name, value } = e.target;
    setXuatChieu({
      ...xuatChieu,
      [name]: value,
    });
  };

useEffect(()=>{console.log(addphim)},[addphim])


const handleAddXuatChieu = () => {
  // Tạo một đối tượng mới thể hiện thời gian chiếu mới
  const newShowtime = {
    date: xuatChieu.date,
    time: [],
  };

  // Thêm đối tượng mới vào danh sách timeStart trong state addphim
  setAddphim((prevAddphim) => ({
    ...prevAddphim,
    timeStart: [...prevAddphim.timeStart, newShowtime],
  }));

  // Đặt lại state xuatChieu về giá trị mặc định
  setXuatChieu({
    date: "",
    time: [],
  });
};

  

  const handleRemoveXuatChieu = (index) => {
    const updatedTimeStart = [...addphim.timeStart];
    updatedTimeStart.splice(index, 1);
    setAddphim({
      ...addphim,
      timeStart: updatedTimeStart,
    });
  };

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL + ORDER.verifyLogin}`,
          {
            headers: { Authorization: getCookieValue("access_token") },
          }
        );
        if (response.data.code === 200 || response.data.code === 401) {
          setIsLogin(false);
          alert("Please login first.");
          window.location.href = "/login";
        } else {
          setIsLogin(true);
          const userRole = response.data.role;
          if (userRole && userRole.includes("admin")) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            alert("Admin required.");
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    verifyLogin();
  }, []);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL + ORDER.getRoom}`);
        if (response.data.code === 200) {
          // Lấy danh sách phòng chiếu từ response và cập nhật state
          // Ví dụ: setRooms(response.data.rooms);
          setRooms(response.data.data)

          // setRooms(response)
        } else {
          console.error("Failed to fetch rooms:", response.data.mesg);
        }
      } catch (error) {
        console.error("Error occurred while fetching rooms:", error);
      }
    };
  
    getRooms();
  }, []);
    useEffect(()=>{console.log(rooms)},[rooms])
    const handleAddNewTime = () => {
      if (newTime.trim() !== "") {
        // Tạo một mảng thời gian mới để thêm vào phần tử cuối cùng trong timeStart
        const updatedTimeStart = addphim.timeStart.map((showtime, index) => {
          if (index === addphim.timeStart.length - 1) {
            // Nếu đang ở phần tử cuối cùng, thêm thời gian mới
            return {
              ...showtime,
              time: [
                ...showtime.time,
                {
                  timeR: newTime,
                  seats: rooms[0].seats, // Đảm bảo bạn lấy ghế ngồi từ phòng chiếu thích hợp
                },
              ],
            };
          }
    
          return showtime;
        });
    
        // Cập nhật state addphim với danh sách timeStart mới
        setAddphim((prevAddphim) => ({
          ...prevAddphim,
          timeStart: updatedTimeStart,
        }));
    
        // Đặt lại giá trị của input
        setNewTime("");
      }
    };
    

  return (
    <div>
      <h2>Add Movie</h2>
      <div className="addphim-container">
        <form className="addphim-form" onSubmit={handleAddMovie}>
          <input
            type="text"
            name="title"
            value={addphim.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="category"
            value={addphim.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            type="text"
            name="releaseDate"
            value={addphim.releaseDate}
            onChange={handleChange}
            placeholder="Release Date"
          />
          <input
            type="number"
            name="duration"
            value={addphim.duration}
            onChange={handleChange}
            placeholder="Duration (minutes)"
          />
          <input
  type="text"
  name="price"
  value={addphim.price}
  onChange={handleChange}
  placeholder="price (VND)"
/>
          <input
            type="text"
            name="actors"
            value={addphim.actors}
            onChange={handleChange}
            placeholder="Actors"
          />
          <input
            type="text"
            name="author"
            value={addphim.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <input
            type="text"
            name="img"
            value={addphim.img}
            onChange={handleChange}
            placeholder="Image URL"
          />
           <div className="CTC" onClick={handleSelectBranch}>Chọn tất cả</div>
         <div className="provv">
        
         {VietnamProvinces.map((province, index) => (
  <div className="prov" key={index}>
    <input
      type="checkbox"
      name="province"
      id={`province-${index}`}
      value={province}
      onChange={handleChangeP}
      checked={selectedProvinces.includes(province)}
    />
    <label htmlFor={`province-${index}`}>{province}</label>
  </div>
))}

    </div>
          <textarea
            name="description"
            value={addphim.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <div className="room" >
          {rooms.map((item, index)=>(
            <div
            className={`${
              item.roomNumber === addphim.roomNumber  ? "RsD" : ""
            }`} 
            key={index}
            onClick={()=>{RoM(item.roomNumber)}}
            >
              {item.roomNumber}
            </div>
          ))}
          </div>
        
       {/*       timeStart      */}  
          <div>
            <input
              type="date"
              name="date"
              value={xuatChieu.date}
              onChange={handleXuatChieuChange}
              placeholder="Date"
            />
           
            <button type="button" onClick={handleAddXuatChieu}>
              Add Showtime
            </button>
            <div>
  <input
    type="time"
    name="newTime"
    value={newTime}
    onChange={(e) => setNewTime(e.target.value)}
    placeholder="New Time"
  />
  <button type="button" onClick={handleAddNewTime}>
    +
  </button>
</div>
          </div>


          <div>
  {addphim.timeStart.map((showtime, index) => (
    <div key={index}>
      <span>{`Date: ${showtime.date} / Time: `}
      {showtime.time && showtime.time.map((timeR,index)=>(
        <span key={index} style={{ fontWeight: 'bold' }}>
        {console.log(showtime.time.length,index)}
      {timeR && showtime.time.length-1 == index ? timeR.timeR : timeR.timeR+", "}
      </span>     
     ))}
        
      </span>
      <button type="button" onClick={() => handleRemoveXuatChieu(index)}>
        Remove Showtime
      </button>
    </div>
  ))}
</div>

          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default Addphim;
