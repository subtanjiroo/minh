import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ORDER } from '../../utils/constants';


function UpdatePhim() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        //Rooms
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
      const RoM = (roomNumber) => {
        setupdatePhim({
          ...updatePhim,
          roomNumber: roomNumber,
        });
      };

      const [updatePhim, setupdatePhim] = useState({
        title: "",
        category: "",
        description: "",
        releaseDate: "",
        duration: "",
        actors: "",
        author: "",
        img: "",
        price: "",
        roomNumber: "",
        chinhanh: [],
        timeStart: [],
        seatsC: [], // Thêm khai báo này để khởi tạo seatsC là một mảng trống
      });

  //id movie
useEffect(()=>{console.log(updatePhim)},[updatePhim])
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL + ORDER.getMovie}?filter=${id}`)
        .then((response) => {
          const dataResponse = response.data;
          if (dataResponse.code === 200) {
            setupdatePhim(dataResponse.data);
            setSelectedProvinces(dataResponse.data.chinhanh)
          } else {
            alert("Không tìm thấy dữ liệu");
          }
        });
    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }, []);
  //xu ly change cua input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdatePhim({
      ...updatePhim,
      [name]: value,
    });
  };

  
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

//xu ly chi nhanh
  const handleSelectBranch = () => {
    if (selectedProvinces.length !== VietnamProvinces.length) {
      setSelectedProvinces([...VietnamProvinces]);
      setupdatePhim({
        ...updatePhim,
        chinhanh: [...VietnamProvinces],
      });
    } else {
      setSelectedProvinces([]);
      setupdatePhim({
        ...updatePhim,
        chinhanh: [],
      });
    }
  };
  
  const handleChangeP = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedProvinces([...selectedProvinces, value]);
      setupdatePhim({
        ...updatePhim,
        chinhanh: [...selectedProvinces, value],
      });
    } else {
      setSelectedProvinces(selectedProvinces.filter((province) => province !== value));
      setupdatePhim({
        ...updatePhim,
        chinhanh: selectedProvinces.filter((province) => province !== value),
      });
    }
  };
//***************           timeStart                **************//

const [newTime, setNewTime] = useState("");

const handleAddNewTime = () => {
    if (newTime.trim() !== "") {
      // Tạo một mảng thời gian mới để thêm vào phần tử cuối cùng trong timeStart
      const updatedTimeStart = updatePhim.timeStart.map((showtime, index) => {
        if (index === updatePhim.timeStart.length - 1) {
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
      setupdatePhim((prevupdatePhim) => ({
        ...prevupdatePhim,
        timeStart: updatedTimeStart,
      }));
  
      // Đặt lại giá trị của input
      setNewTime("");
    }
  };

const handleAddXuatChieu = () => {
    // Tạo một đối tượng mới thể hiện thời gian chiếu mới
    const newShowtime = {
      date: xuatChieu.date,
      time: [],
    };
  
    // Thêm đối tượng mới vào danh sách timeStart trong state addphim
    setupdatePhim((prevupdatePhim) => ({
      ...prevupdatePhim,
      timeStart: [...prevupdatePhim.timeStart, newShowtime],
    }));
  
    // Đặt lại state xuatChieu về giá trị mặc định
    setXuatChieu({
      date: "",
      time: [],
    });
  };

const handleXuatChieuChange = (e) => {
    const { name, value } = e.target;
    setXuatChieu({
      ...xuatChieu,
      [name]: value,
    });
  };

const [ xuatChieu, setXuatChieu] = useState({
    date: "",
    time:"",  
  });
  const [selectedTime, setSelectedTime] = useState();

  const handleRemoveXuatChieu = (index) => {
    const updatedTimeStart = [...updatePhim.timeStart];
    updatedTimeStart.splice(index, 1);
    setupdatePhim({
      ...updatePhim,
      timeStart: updatedTimeStart,
    });
  };

  const NCChange = (time) => {
    setXuatChieu({
      ...xuatChieu,
      time: time,
    });
    setSelectedTime(time)
  }
  useEffect(()=>{console.log(xuatChieu)},[xuatChieu])
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        axios.post(`${process.env.REACT_APP_BACKEND_URL + ORDER.UpdateMoviee}`,{
            dataRequest:updatePhim}).then((response)=>{ 
                console.log(updatePhim);
                alert("cap nhat thanh cong")
                window.location.reload()
            })
    } catch (error) {
        console.error("cap nhat khong thanh cong:", error);
    }
  };

  //* popup *//
  const [showPopup, setShowPopup] = useState(false);
  //*   SEATS    *//
  const [seatSS, setseatSS] = useState([]);

  const handleSeatSelection = (time,date,seatNumber, isOccupied) => {
    const newS = {
        date:date,
        time:time,
      seatNumber: seatNumber,
      isOccupied: !isOccupied,
    };
  
    // Tạo một bản sao của mảng seatSS
    const updatedSeatSS = [...seatSS];
    // Tìm kiếm chỉ mục của phần tử trong mảng
    const seatIndex = updatedSeatSS.findIndex(
      (seat) => seat.seatNumber === seatNumber && seat.time ==xuatChieu.time && seat.date == xuatChieu.date
    );
  
    if (seatIndex === -1) {
      // Thêm ghế vào danh sách nếu chưa tồn tại
      updatedSeatSS.push(newS);
    } else {
      updatedSeatSS[seatIndex].isOccupied = !updatedSeatSS[seatIndex].isOccupied;
    }
  
    // Cập nhật state với danh sách ghế mới
    setseatSS(updatedSeatSS);
  
    // Cập nhật state của updatePhim
    setupdatePhim({ ...updatePhim, seatsC: updatedSeatSS });
  };
  
  

  useEffect(()=>{console.log(seatSS)},[seatSS])
  
  
  
  
  return (
    <div>
        {showPopup && (
        <div className="popup-container">
          <button className="btn2" onClick={() => {setShowPopup(false)}}>
            Đóng
          </button>
          <div className="popup-content">
          {xuatChieu.date && (
              <div  style={{marginTop:"20px"}} className="NCC">
                {
                  updatePhim.timeStart.find((item) => item.date === xuatChieu.date).time.map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                     
                      className={`NC ${selectedTime == time.timeR ? "selecte" : ""}`}
                      onClick={() => {
                        NCChange(time.timeR);
                      }}
                    >
                      {time.timeR}
                    </div>
                  ))
                }
              </div>
            )}
          <div className="roomm">
            {xuatChieu.time && updatePhim.timeStart.map((itemm)=>(
    itemm.time.map((seats)=>(
      seats.timeR === xuatChieu.time && (
        seats.seats.map((item,index)=>(
            <div
  onClick={() => {
    handleSeatSelection(seats.timeR,itemm.date,item.seatNumber, item.isOccupied);
  }}
  className={`seats ${
    
    seatSS.some(seatItem => seatItem.time == xuatChieu.time && seatItem.date == xuatChieu.date &&  seatItem.seatNumber === item.seatNumber && seatItem.isOccupied) && seatSS.some(itemm => itemm.date === xuatChieu.date && itemm.time === xuatChieu.time)
    ? "checked"
      :item.isOccupied && seatSS.some(seatItem =>seatItem.time == xuatChieu.time && seatItem.date == xuatChieu.date && seatItem.seatNumber === item.seatNumber && seatItem.isOccupied === false ) ===false
      ?"checked"
      : "unchecked"
}`}

    key={index}
>
  {item.seatNumber}
  
</div>
        ))
        
      )

      )
    
    )
  ))
  } 
  </div>
  </div>
            </div>
        )}
         
         
      <h2>Update Movie</h2>
      <div className="addphim-container">
        <form className="addphim-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={updatePhim.title}
            onChange={handleChange}
            placeholder="Title"
          />
        <input
            type="text"
            name="category"
            value={updatePhim.category}
            onChange={handleChange}
            placeholder="Category"
          />
<input
            type="text"
            name="releaseDate"
            value={updatePhim.releaseDate}
            onChange={handleChange}
            placeholder="Release Date"
          />
          <input
            type="number"
            name="duration"
            value={updatePhim.duration}
            onChange={handleChange}
            placeholder="Duration (minutes)"
          />
          <input
  type="text"
  name="price"
  value={updatePhim.price}
  onChange={handleChange}
  placeholder="price (VND)"
/>
<input
            type="text"
            name="actors"
            value={updatePhim.actors}
            onChange={handleChange}
            placeholder="Actors"
          />
          <input
            type="text"
            name="author"
            value={updatePhim.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <input
            type="text"
            name="img"
            value={updatePhim.img}
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
            value={updatePhim.description}
            onChange={handleChange}
            placeholder="Description"
          />

          {/* Rooms */}
<div className="room" >
          {rooms.map((item, index)=>(
            <div
            className={`${
              item.roomNumber === updatePhim.roomNumber  ? "RsD" : ""
            }`} 
            key={index}
            onClick={()=>{RoM(item.roomNumber)}}
            >
              {item.roomNumber}
            </div>
          ))}
          </div>
          {/*   timeStart   */}
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
  {updatePhim.timeStart.map((showtime, index) => (
    <div key={index}>
      <span>{`Date: ${showtime.date} / Time: `}
      {showtime.time && showtime.time.map((timeR,index)=>(
        <span key={index} style={{ fontWeight: 'bold' }}>

      {timeR && showtime.time.length-1 == index ? timeR.timeR : timeR.timeR+", "}
      </span>     
     ))}
        
      </span>
      <button type="button" onClick={() => handleRemoveXuatChieu(index)}>
        Remove Showtime
      </button>
      <button type="button" onClick={()=>{setXuatChieu({date:showtime.date});setShowPopup(true)}}>
        Edit Seats
      </button>
    </div>
  ))}
</div>
          <button type="submit">Update Movie</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePhim;
