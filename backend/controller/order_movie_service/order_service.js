const mongoose = require("mongoose");
const Bill = require("../../models/billing");
const Order = require("../../models/order");
const Movie = require("../../models/movies")
const createOrder = async (req, res) => {
  let newOrder;
  const dataRequest = req.body.dataRequest;
  try {
    

    const { room_number, movie_name, timeStart, seats } = dataRequest;
    const movie = await Movie.findOneAndUpdate(
      { 
        title: movie_name,
        roomNumber: room_number,
      },
      { 
        $set: { "timeStart.$[outer].time.$[inner].seats.$[seat].isOccupied": true } // Cập nhật trường isOccupied
      },
      { 
        new: true,
        arrayFilters: [
          { "outer.date": timeStart[0].date },
          { "inner.timeR": timeStart[0].time },
          { "seat.seatNumber": { $in: seats } } // Chỉ cập nhật cho các ghế trong danh sách seats mà khôn quan tâm tới isOccpied 
        ]
      }
    ); 
    console.log(dataRequest)
    const orderData = await Order.find();
    const billData = await Bill.find();
    const newOrder = new Order({
      movie_name: dataRequest.movie_name,
      seat: dataRequest.seats,
      room_number: dataRequest.room_number,
      client_phone: dataRequest.client_phone,
      client_name: dataRequest.client_name,
      price: dataRequest.price,
      addition: dataRequest.addition,
      client_email: dataRequest.client_email,
      timeStart: dataRequest.timeStart,
      total: dataRequest.total,
      chinhanh: dataRequest.chinhanh,
      payment_method: "online",
      status_order: 1,
      status_order_des: "khoi tao don hang",
      createdDate: new Date(),
    });
    const newBill = new Bill({
      order_id: orderData.length + 1,
      cilentName: dataRequest.client_name,
      total: dataRequest.total,
      card_number: dataRequest.bill.card_number,
      expired_month: dataRequest.bill.expired_month,
      expired_year: dataRequest.bill.expired_year,
      card_type: dataRequest.bill.card_type,
      bank: dataRequest.bill.bank,
      createdDate: new Date(),
    });
    const addedBill = await newBill.save();
    const addedOrder = await newOrder.save();
    return res.status(200).send({
      code: 200,
      mesg: "thanh cong",
      data: { ...addedOrder._doc, bill: { ...addedBill._doc } },
    });
  } catch (error) {
    console.log(error);
    console.log("Added object:");
    return res.status(500).send({ code: 500, mesg: "that bai XXX" });
  }
};
const LS = async(req,res) =>{
  try {
    dataRequest = req.body.dataRequest
    const movie = await Order.find({client_email:dataRequest})
    
    return res.status(200).send({
      code: 200,
      mesg: "thanh cong",
      data: movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, mesg: "that bai LS" });
  }
  
}
module.exports = { createOrder,LS};
