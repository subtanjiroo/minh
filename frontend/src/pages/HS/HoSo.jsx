import React, { useEffect, useState } from "react";
import axios from "axios";
import { ORDER, getCookieValue } from "../../utils/constants";
import "./HoSo.css";

function HoSo() {
  const [DP, setDP] = useState();
  const [update, setUpdate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [LSDV, setLSDV] = useState([]);
  const [filterDate, setFilterDate] = useState();
  const [updateC, setupdateC] = useState({
    name: "",
    phone_number: "",
    email: "",
    newPassword: "",
    curPassword:"",
    BoD: "",
  });

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL + ORDER.verifyLogin}`, {
          headers: { Authorization: getCookieValue("access_token") },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200 || response.data.code === 401) {
            setIsLogin(false);
            alert("Login First!!!");
            window.location = "/login";
          } else {
            setIsLogin(true);
            const customerData = response.data;
            // Chuyển đổi BoD sang định dạng yyyy-MM-dd
            if (customerData.BoD) {
              customerData.BoD = new Date(customerData.BoD).toISOString().split("T")[0];
            }

            setupdateC(customerData);
            

          }
        });
    } catch (error) {
      console.error("Error fetching customer info:", error);
    }
  }, []);

  useEffect(() => {
    try {
        if(updateC.password){
        const DPP = () => {
            axios
              .post(`${process.env.REACT_APP_BACKEND_URL + ORDER.DPS}`, {
                dataRequest: updateC.password,
              })
              .then((response) => {
                setDP(response.data.data);
              });
          };
          DPP();
        }
    } catch (error) {
        console.log(error)
    }
   
  }, [updateC.password]);

  useEffect(() => {
    console.log(updateC);
  }, [updateC]);

  const handleEditProfile = () => {
    setUpdate(!update);
  };

  const DataC = (e) => {
    const { name, value } = e.target;
    setupdateC((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Done = () => {
    console.log(updateC)
    axios.post(`${process.env.REACT_APP_BACKEND_URL +ORDER.UHS}`,{
        dataRequest: updateC
    }).then((response)=>{
        if(response.data.code === 200){
            alert(response.data.mesg)
            window.location.reload()
        }else{
            alert(response.data.mesg)
        }
    })
  };
  useEffect(() => {
    if (updateC) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL + ORDER.LS}`, { dataRequest: updateC.email }).then((response) => {
        setLSDV(response.data.data);
      });
    }
  }, [updateC]);
  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };
  const filteredOrders = filterDate
    ? LSDV.filter(order => order.timeStart[0].date === filterDate)
    : LSDV;
useEffect(()=>{console.log(LSDV)},[LSDV])
  return (
    <div className="containerHS">
      {updateC && !update ? (
        <div className="profile">
          <h2>Customer Profile</h2>
          <div className="info-item">
            <label>Name:</label>
            <span>{updateC.name}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{updateC.email}</span>
          </div>
          <div className="info-item">
            <label>Password:</label>
            <span>{DP && "*".repeat(DP)}</span>
          </div>
          <div className="info-item">
            <label>Phone Number:</label>
            <span>{updateC.phone_number}</span>
          </div>
          <div className="info-item">
            <label>Date of Birth:</label>
            <span>{new Date(updateC.BoD).toLocaleDateString()}</span>
          </div>
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      ) : (
        updateC && (
          <div className="profile">
            <h2>Customer Profile</h2>
            <div className="info-item">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updateC.name}
                onChange={DataC}
              />
            </div>
            <div className="info-item">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={updateC.email}
                readOnly={!update}
                onChange={DataC}
              />
            </div>
            <div className="info-item">
              <label>your current Password:</label>
              <input
                type="text"
                name="curPassword"
                placeholder="current password"
                onChange={DataC}
              />
            </div>
            <div className="info-item">
              <label>New Password:</label>
              <input
                type="text"
                name="newPassword"
                placeholder="new password"
                onChange={DataC}
              />
            </div>
            <div className="info-item">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={updateC.phone_number}
                onChange={DataC}
              />
            </div>
            <div className="info-item">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="BoD"
                value={updateC.BoD}
                onChange={DataC}
              />
            </div>
            <button className="edit-button" onClick={Done}>
              Done
            </button>
            <button
              className="edit-button"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        )
      )}
       <div className="filter-section">
            <label>Filter by Date: </label>
            <input type="date" value={filterDate} onChange={handleDateChange} />
          </div>
      <div className="LSDV">
            <h5>Lịch Sử Đặt Vé</h5>
            {LSDV && filteredOrders.map((item, index) => (
              <div key={index} className="order-item">
                <h6>Order {index + 1}</h6>
                <div className="order-details">
                  <p><strong>Movie Name:</strong> {item.movie_name}</p>
                  <p><strong>Room Number:</strong> {item.room_number}</p>
                  <p><strong>Seats:</strong> {item.seat.join(", ")}</p>
                  <p><strong>Show Time:</strong> {item.timeStart[0].date} at {item.timeStart[0].time}</p>
                  <p><strong>Price:</strong> {item.price} VND</p>
                  
                  <p><strong>Payment Method:</strong> {item.payment_method}</p>
                  <div className="additionn">
                    <strong>Additions:</strong>
                    {item.addition[0].map((add, idx) => (
                      <div className="ADDC"  key={idx}>
                        
                        <div>{add.name} X {add.quantity} = {add.price} VND</div>
                      
                        
                      </div>
                      
                    ))
                    
                    }
                   
                  </div>
                  <p style={{fontSize:"22px",color:"red"}}><strong>Total:</strong> {item.total} VND</p>
                </div>
              </div>
            ))
           
            }
          </div>
    </div>
  );
}

export default HoSo;
