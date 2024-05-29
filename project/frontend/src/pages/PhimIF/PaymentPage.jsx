import React, { useEffect, useState } from "react";
import { ORDER } from "../../utils/constants";
import axios from "axios";

function PaymentPage({ order, setOrder }) {
  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [cardInfo, setCardInfo] = useState({
    cilentName:"",
    card_number: "",
    expired_month: "",
    expired_year: "",
    bank: "BIDV",
    card_type:paymentMethod,
    total:order.total,
  });
useEffect(()=>{console.log(order)},[order])
useEffect(()=>{console.log(cardInfo)},[cardInfo])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };
  const giagoc=()=>{
    const KQ = parseInt(order.price) / parseInt(order.seats.length)
    return KQ
  }
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    setOrder({
      ...order,
      bill: [cardInfo],
    });

      //gui du lieu ve creata order
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL + ORDER.movie_order}`,
            {
              dataRequest: order,
            }
          )
          .then((response) => {
            const TT = response.data;
              console.log(TT.mesg)
            alert("dat ve thanh cong")
            window.location.href = "/phim"
          });
      } catch (error) {
  console.log("loi")
  console.log(error)
  }
    // Update bill in the order object with the entered card information
//     try {
//       axios
//         .post(
//           `${process.env.REACT_APP_BACKEND_URL + ORDER.UpS}`,
//           {
//             dataRequest: order,
//           }
//         )
//         .then((response) => {
//           const TT = response.data;
//             console.log(TT.mesg)
            
//         });
//     } catch (error) {
// console.log("loi rooms")
// console.log(error)
// }

  };

  return (
    <div className="payment-page">
      <h2>Thanh toán</h2>
      <div className="order-details">
        <h3>Chi tiết đơn hàng:</h3>
        <span style={{ marginLeft: "20px" }}>Seat: </span>
{order.seats.map((seats, index) => (
  <span key={index}>
    {seats}
    {index !== order.seats.length - 1 ? ", " : " || "}
  </span>
))} <span>Giá Ghế: {giagoc()}</span>

        <ul>
          {order.addition.map((productGroup, index) => (
            <li key={index}>
              {productGroup.map((product) => (
                <div key={product.id}>
                  {product.name}: {product.price} VND, Số Lượng: {product.quantity}
                </div>
              ))}
            </li>
          ))}
        </ul>
        <div>Tổng Thanh Toán: {order.total}</div>
      </div>
      <form>
        <label htmlFor="payment-method">Chọn phương thức thanh toán:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          name="card_type"
        >
         <option value="Bank">Bank</option>
         <option value="MoMo">MoMo</option>
         <option value="Visa">Visa</option>
        </select>
        {paymentMethod === "Bank" && (
          <div>
            <label htmlFor="bank">Chọn ngân hàng:</label>
            <select
              id="bank"
              name="bank"
              value={cardInfo.bank}
              onChange={handleInputChange}
            >
             <option value="BIDV">BIDV</option>
             <option value="VietinBank">VietinBank</option>
             <option value="MBB">MB Bank</option>
            </select>
            <label htmlFor="card_number">Số thẻ: </label>
            <input
              type="text"
              id="card_number"
              name="card_number"
              value={cardInfo.card_number}
              placeholder="****************"

              onChange={handleInputChange}
            />
            <label htmlFor="cilentName">Tên Chủ Thẻ: </label>
            <input
              type="text"
              id="cilentName"
              name="cilentName"
              value={cardInfo.cilentName}
              placeholder="Nguyen Van A"
              onChange={handleInputChange}
              />
               <br></br>
            <label htmlFor="expired_month">Tháng hết hạn: </label>
            <input
              type="text"
              id="expired_month"
              name="expired_month"
              value={cardInfo.expired_month}
              onChange={handleInputChange}
            />
        
            <label style={{paddingLeft:"10px"}} htmlFor="expired_year">Năm hết hạn: </label>
            <input
              type="text"
              id="expired_year"
              name="expired_year"
              value={cardInfo.expired_year}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button type="button" onClick={handlePayment}>
          Thanh toán
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
