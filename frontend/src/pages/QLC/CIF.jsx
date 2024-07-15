import React, { useState, useEffect } from "react";
import axios from "axios";
import { ORDER, getCookieValue } from "../../utils/constants";
import "./CIF.css";

function CIF() {
  const [IsAdmin, setIsAdmin] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const [LSDV, setLSDV] = useState([]);
  const [CData, setCdata] = useState(null);
  const [filterDate, setFilterDate] = useState(""); // New state for filter date

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL + ORDER.SOO}`, { dataRequest: id }).then((response) => {
      const DB = response.data.data;
      if (DB.BoD) {
        DB.BoD = new Date(DB.BoD).toISOString().split("T")[0];
      }
      setCdata(DB);
    });
  }, [id]);

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
    if (CData) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL + ORDER.LS}`, { dataRequest: CData.email }).then((response) => {
        setLSDV(response.data.data);
      });
    }
  }, [CData]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };
  const filteredOrders = filterDate
    ? LSDV.filter(order => order.timeStart[0].date === filterDate)
    : LSDV;

  return (
    <div className="cif-container">
      {CData && (
        <div>
          <div className="client-info">
            <div className="info-item">
              <label>Name:</label>
              <span id="name">{CData.name}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span id="email">{CData.email}</span>
            </div>
            <div className="info-item">
              <label>Phone Number:</label>
              <span id="phone">{CData.phone_number}</span>
            </div>
            <div className="info-item">
              <label>Date of Birth:</label>
              <span id="BoD">{CData.BoD}</span>
            </div>
          </div>

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
                  <div className="addition">
                    <strong>Additions:</strong>
                    {item.addition[0].map((add, idx) => (
                      <div key={idx}>
                        <p>{add.name} - {add.quantity} x {add.price} VND</p>
                      </div>
                    ))
                    
                    }
                   
                  </div>
                  <p><strong>Total:</strong> {item.total} VND</p>
                </div>
              </div>
            ))
           
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default CIF;
