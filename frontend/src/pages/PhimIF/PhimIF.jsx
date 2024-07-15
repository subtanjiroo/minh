import React, { useState, useEffect } from "react";
import "./phimIF.css"; // Import CSS file
import axios from "axios";
import PaymentPage from "./PaymentPage";

import { ORDER, getCookieValue } from "../../utils/constants";

function PhimIF() {
  const [phim, setPhim] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [rooms,setRooms] = useState()
  const [userData,setuserData] = useState()
  const [selectedPopcorn, setSelectedPopcorn] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState([]);
  const [inputClicked, setInputClicked] = useState(false)
  const popcorns = [
    { id: 1, name: "Popcorn A", price: 50000, quantity: 1 },
    { id: 2, name: "Popcorn B", price: 60000, quantity: 1 },
    { id: 3, name: "Popcorn C", price: 70000, quantity: 1 },
    { id: 4, name: "Popcorn D", price: 70000, quantity: 1 },
  ];

  const drinks = [
    { id: 1, name: "Drink A", price: 30000, quantity: 1 },
    { id: 2, name: "Drink B", price: 40000, quantity: 1 },
    { id: 3, name: "Drink C", price: 50000, quantity: 1 },
    { id: 4, name: "Drink D", price: 50000, quantity: 1 },

  ];
  const [showPaymentPage, setShowPaymentPage] = useState(false); // Thêm state để điều khiển việc hiển thị trang thanh toán
useEffect(()=>{
  console.log(phim)},[phim])

  const handleSelectPopcorn = (popcorn) => {
    // Kiểm tra xem selectedPopcorn đã được khởi tạo chưa
    if (!inputClicked) {
    if (selectedPopcorn) {
      const index = selectedPopcorn.findIndex(item => item.id === popcorn.id);
      if (index === -1) {
        // Nếu chưa tồn tại, thêm vào mảng

       setSelectedPopcorn(prevSelectedPopcorn => [...prevSelectedPopcorn, popcorn]);
      } else {
        // Nếu đã tồn tại, loại bỏ khỏi mảng

        const updatedPopcorn = [...selectedPopcorn];
        updatedPopcorn.splice(index, 1);
        setSelectedPopcorn(updatedPopcorn);
      }
    }
  }  };
  
  const handleSelectDrink = (drink) => {
    // Kiểm tra xem selectedDrink đã được khởi tạo là một mảng hay chưa
    if (!inputClicked) {
      if (selectedDrink) {
      const index = selectedDrink.findIndex((item) => item.id === drink.id);
      if (index === -1) {
        // Nếu chưa tồn tại, thêm vào mảng
        setSelectedDrink(prevSelectedDrink => 
         [...prevSelectedDrink, drink]);
      } else {
        // Nếu đã tồn tại, loại bỏ khỏi mảng
        const updatedDrink = [...selectedDrink];
        updatedDrink.splice(index, 1);
        setSelectedDrink(updatedDrink);
      }
    }
    }
  }
  const handleUpdatePopcornQuantity = (popcornId, newQuantity) => {
    const updatedPopcorns = selectedPopcorn.map(popcorn => {
      if (popcorn.id === popcornId) {
        return { ...popcorn, quantity: newQuantity };
      }
      return popcorn;
    });
    setSelectedPopcorn(updatedPopcorns);;
  };
  
  
  const handleUpdateDrinkQuantity = (drinkId, newQuantity) => {
    const updatedDrink = selectedDrink.map(drink => {
      if (drink.id === drinkId) {
        return { ...drink, quantity: newQuantity };
      }
      return drink;
    });
    setSelectedDrink(updatedDrink);
  };

  const increaseDrinkQuantity = (drinkId) => {
    const updatedDrink = selectedDrink.map(drink => {
      if (drink.id === drinkId) {
        return { ...drink, quantity: drink.quantity + 1 };
      }
      return drink;
    });
    setSelectedDrink(updatedDrink);
  };
  
  const decreaseDrinkQuantity = (drinkId) => {
    const updatedDrink = selectedDrink.map(drink => {
      if (drink.id === drinkId && drink.quantity > 1) {
        return { ...drink, quantity: drink.quantity - 1 };
      }
      return drink;
    });
    setSelectedDrink(updatedDrink);
  };
  
  

  
  const [order, setOrder] = useState(
  
    {
    movie_name: "",
    seats: [], // Thay đổi seats thành một mảng để lưu trữ danh sách các ghế đã chọn
    room_number: "",
    client_phone: "",
    client_name: "",
    price: "",
    addition: [],
    client_email: "",
    chinhanh:"",
    total:"",
    timeStart: [],
    bill:[],
    
  });

  const [xuatChieu, setXuatChieu] = useState({
    date: "",
    time: "",
  });
  const XCChange = (date) => {
    setXuatChieu({
      ...xuatChieu,
      date: date,
    });
  };
  const CN = (chinhanh) => {
    setOrder({
      ...order,
      chinhanh: chinhanh
    });
  };
  const NCChange = (time) => {
    setXuatChieu({
      ...xuatChieu,
      time: time,
    });
  setSelectedTime(time)
    // Kiểm tra xem ngày đã tồn tại trong order.timeStart hay chưa
    const index = order.timeStart.findIndex((item) => item.date === xuatChieu.date);
    if (index === -1) {
      // Nếu ngày chưa tồn tại, thêm mới với date và time mới
      setOrder({
        ...order,
        timeStart: [{date: xuatChieu.date, time:time}],
      });
    } else {
      // Nếu ngày đã tồn tại, cập nhật lại time của ngày đó
      const updatedTimeStart = [...order.timeStart];
      updatedTimeStart[index].time = time;
      setOrder({
        ...order,
        timeStart: updatedTimeStart,
      });
      
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const handleBookTicket = () => {
    if(isLogin){
      setShowPopup(true); // Khi nhấn nút "Đặt Vé", hiển thị popup
    }else{
      alert("Please login first.");
      window.location="/login"
    }
  };
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
          } else {
            alert("Không tìm thấy dữ liệu");
          }
        });
    } catch (error) {
      alert("Đã có lỗi xảy ra");
    }
  }, []);
  
  //rooms
 
  
  const [selectedTime, setSelectedTime] = useState();
  const handleSeatSelection= (seatNumber,isOccupied)=>{
    if(!isOccupied){
      const selectedSeats = [...order.seats];
      const seatIndex = selectedSeats.indexOf(seatNumber);
      if (seatIndex === -1) {
        // Thêm ghế vào danh sách nếu chưa tồn tại
        selectedSeats.push(seatNumber);
      } else {
        // Loại bỏ ghế khỏi danh sách nếu đã tồn tại
        selectedSeats.splice(seatIndex, 1);
  
      }
  setOrder({ ...order, seats: selectedSeats });
    }
  }

  const handleCF = () => {
    // const occupiedSeats = [];
  
    // // Duyệt qua danh sách các ghế đã chọn
    // order.seats.forEach((seatNumber) => {
    //   // Kiểm tra trạng thái của ghế
    //   const seats = rooms.seats.find((seats) => seats.seatNumber === seatNumber);
    //   if (seats && seats.isOccupied) {
    //     // Nếu ghế đã bị đặt, thêm vào danh sách occupiedSeats
    //     occupiedSeats.push(seatNumber);
    //   }
    // });

    // // Nếu có ghế đã bị đặt, hiển thị thông báo và hủy đặt vé
    // if (occupiedSeats.length > 0) {
    //   alert(`Ghế ${occupiedSeats.join(', ')} đã được đặt bởi người khác. Vui lòng chọn lại ghế khác.`);
    //   return; // Hủy bỏ thao tác đặt vé
    // } else {
      
   
    // }
    if(userData){
      setOrder({
        ...order,
        movie_name: phim.title,
        room_number: phim.roomNumber,
        client_phone: userData.phone_number,
        client_name: userData.name,
        price: parseInt(phim.price * order.seats.length) ,
        addition: [selectedPopcorn,selectedDrink],
        client_email: userData.email,
        total:parseInt(total()+TPS()),
      });
      setShowPaymentPage(true);
      
    }
    // console.log(occupiedSeats);
  };
  const TPS = ()=>{
   const TPS1 =  phim.price * order.seats.length
   return TPS1
  }
  const total=()=>{
    const totalP = selectedPopcorn.reduce((accumulator, curPopcorn) => {
      // Tính tổng tiền của mỗi mặt hàng popcorn (giá * số lượng)
      const itemPrice = curPopcorn.price * curPopcorn.quantity;
      // Thêm vào tổng số tiền hiện tại
      return accumulator + itemPrice;
    }, 0); // Khởi tạo giá trị accumulator là 0
    const totalD = selectedDrink.reduce((accumulator, curDrink) => {
      const itemPrice = curDrink.price * curDrink.quantity;
      return accumulator + itemPrice;

    },0)

    return totalP+totalD;
  }
//user data
useEffect(() => {
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL + ORDER.verifyLogin}`,
    {
      headers: { Authorization: getCookieValue("access_token") },
    }
  )
  .then((response) => {
    const userDT = response.data;
    if (response.data.code === 200 || response.data.code === 401) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      setuserData(userDT);
    }
  })
  .catch((error) => {
    console.error("Error fetching user role:", error);
  });
}, []);

const increasePopcornQuantity = (popcornId) => {
  const updatedPopcorn = selectedPopcorn.map(popcorn => {
    if (popcorn.id === popcornId) {
      return { ...popcorn, quantity: popcorn.quantity + 1 };
    }
    return popcorn;
  });
  setSelectedPopcorn(updatedPopcorn);
};

const decreasePopcornQuantity = (popcornId) => {
  const updatedPopcorn = selectedPopcorn.map(popcorn => {
    if (popcorn.id === popcornId && popcorn.quantity > 1) {
      return { ...popcorn, quantity: popcorn.quantity - 1 };
    }
    return popcorn;
  });
  setSelectedPopcorn(updatedPopcorn);
};
useEffect(() => {
  console.log(order);
}, [order]); 
return (
    <div className="con">
      {/* Hiển thị trang thanh toán nếu showPaymentPage là true */}
      {showPaymentPage ? (
        <PaymentPage order={order} setOrder={setOrder} setShowPaymentPage={setShowPaymentPage} />
      ) : (
     <>
      {showPopup && phim && (
        <div className="popup-container">
          <button className="btn2" onClick={() => setShowPopup(false)}>
            Đóng
          </button>
          <div className="popup-content">
            <h2 className="poptext">Đặt Vé</h2>
            <hr className="hr" />
            <h5 >Xuất Chiếu:</h5>
            <div className="xuatchieu">
              {phim && phim.timeStart && (
                <div>
                  {phim.timeStart.map((item, index) => (
                    <div
                      className={`XC ${
                        xuatChieu.date === item.date ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => {
                        XCChange(item.date, index); // Chuyển vị trí của ngày chiếu được chọn
                      }}
                    >
                      {item.date}
                    </div>
                  ))}
                </div>
              )}
             {xuatChieu.date ? (
              <div className="NCC">
                {phim.timeStart.find((item) => item.date === xuatChieu.date) ? (
                  phim.timeStart.find((item) => item.date === xuatChieu.date).time.map((time, timeIndex) => (
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
                ) : (
                  <div className="NAN">Không có lịch chiếu cho ngày này</div>
                )}
              </div>
            ) : (
              <div className="NAN">Hãy Chọn Ngày Chiếu</div>
            )}
            </div>
            <hr className="hr" style={{position:"relative",top:"20px"}}/>
            <h5 style={{position:"relative",top:"20px"}}>Chi Nhánh:</h5>
              {phim && phim.chinhanh && (
                <div className="CNN">
                  {phim.chinhanh.map((chinhanh, index) => (
                    <div
                      className={`CN ${order.chinhanh === chinhanh ? "selected" : ""}`}
                      key={index}
                      onClick={() => { CN(chinhanh) }}
                    >
                      {chinhanh}
                    </div>
                  ))}
                </div>
              )}
              <hr className="hr" style={{position:"relative",top:"20px"}}/>
              <h5 style={{position:"relative",top:"25px"}}>chọn chỗ ngồi: {phim.roomNumber}</h5>
              <div className="INFS">SCREEN</div>
              
              <div className="roomm">
  {xuatChieu.time && phim.timeStart.map((item)=>(
    item.time.map((seats)=>(
      seats.timeR === xuatChieu.time && (
        seats.seats.map((item,index)=>(
            <div onClick={()=>{handleSeatSelection(item.seatNumber,item.isOccupied)}} className={`seats ${item.isOccupied ? "checked" : (order.seats.includes(item.seatNumber) ? "selectedS" : "unchecked")}`} key={index}>
              {item.seatNumber}
        </div>
        ))
        
      )

      )
    
    )
  ))
  }
  </div>
<div>
                              <span className="TPS">Total Per seats: {TPS()} VND</span>

              </div> 

                          {/* bap va nuoc */}
                          <hr className="hr" style={{position:"relative",top:"20px"}}/>
              <div className="addition">
      <div className="choosee">
        <h2>Popcorn</h2>
        <div className="itemss">
  {popcorns.map((popcorn) => (
    <div
      key={popcorn.id}
      className={`itemm ${selectedPopcorn && selectedPopcorn.find(item => item.id === popcorn.id) ? "selectedd" : ""}`}
      
    >
      <div onClick={() => handleSelectPopcorn(popcorn)}>
      <p>{popcorn.name}</p>
      <p>Price: {popcorn.price} USD</p>
      </div>
      <div className="plus" onClick={()=>{decreasePopcornQuantity(popcorn.id)}}>-</div>

      <input
      id={popcorn.id}
  type="text"
className="quantity" 
value={selectedPopcorn.find(item => item.id === popcorn.id)?.quantity || 1} // Sử dụng optional chaining và nullish coalescing để xác định giá trị quantity
onChange={(e) => handleUpdatePopcornQuantity(popcorn.id, parseInt(e.target.value))}
onFocus={() => setInputClicked(!inputClicked)}
onBlur={() => setInputClicked(!inputClicked)}
/>
    <div onClick={()=>{increasePopcornQuantity(popcorn.id)}
  
  } className="plus">+</div>
    </div>
  ))}
</div>

      </div>
      <div className="choosee">
        <h2>Drinks</h2>
        <div className="itemss">
    {drinks.map((drink) => (
      <div    
      key={drink.id} className={`itemm ${selectedDrink && selectedDrink.find(item => item.id === drink.id) ? "selectedd" : ""}`}
      >
        <div className="qqq"
        onClick={() => handleSelectDrink(drink)}>
        <p>{drink.name}</p>
        <p>Price: {drink.price} USD</p>
        </div>
       
        <div className="quantity">
          <div className="plus" onClick={() => decreaseDrinkQuantity(drink.id)}>-</div>
          <input
            type="text"
            className="quantity"
            value={selectedDrink.find(item => item.id === drink.id)?.quantity || 1}
            onChange={(e) => handleUpdateDrinkQuantity(drink.id, parseInt(e.target.value))}
            onFocus={() => setInputClicked(!inputClicked)}
            onBlur={() => setInputClicked(!inputClicked)}
          />
          <div className="plus" onClick={() => increaseDrinkQuantity(drink.id)}>+</div>
        </div>
      </div>
    ))}
  </div>
      </div>
    </div>

                          {/* confirm */}
              <div className="CFF">
                <span className="TPS">Total: {total()+TPS()}</span>
              <button type="submit" className="CF" onClick={handleCF}>Confirm</button>
              </div>

            </div>
          </div>
        )}
        {phim ? (
          <div className="phim-container">
            <div className="phimm">
              <div className="phimm1">
                <img className="phim-img" src={phim.img} alt={phim.title} />
                {phim.timeStart && phim.timeStart.length === 0 ? (
                  <p>Phim không còn chiếu</p>
                ) : (
                  <button className="btn1" onClick={handleBookTicket}>
                    Đặt Vé
                  </button>
                )}
              </div>
              <div className="phim-description">
                <h1>{phim.title}</h1>
                <p><span className="bold">Actors:</span> {phim.actors}</p> 
                <p><span className="bold">Author:</span> {phim.author}</p> 
                <p><span className="bold">Time:</span>  {phim.duration} minutes</p>
                <p><span className="bold">Category:</span> {phim.category}</p> 
                <p><span className="bold">Price:</span> {phim.price} VND</p> 
                <p className="green-text bold">Release Date: {phim.releaseDate}</p>
                <div className="des"><p className="bold">Description:</p> <div style={{marginLeft:"10px"}}>{phim.description}</div></div>
              </div>
            </div>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
     </>
      )}
      </div>
    );
  }

  export default PhimIF;


