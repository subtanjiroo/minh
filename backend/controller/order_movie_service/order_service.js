const mongoose = require("mongoose");
const Bill = require("../../models/billing");
const Order = require("../../models/order");
const createOrder = async (req, res) => {
  let newOrder;
  try {
    const dataRequest = req.body.dataRequest;
    const orderData = await Order.find();
    const billData = await Bill.find();
    const newOrder = new Order({
      id: orderData.length + 1,
      movie_name: dataRequest.movie_name,
      seat: dataRequest.seat,
      room_number: dataRequest.room_number,
      client_phone: dataRequest.client_phone,
      client_name: dataRequest.client_name,
      price: dataRequest.price,
      addition: dataRequest.addition,
      client_email: dataRequest.client_email,
      isRegisted: dataRequest.isRegisted,
      payment_method: "online",
      status_order: 1,
      status_order_des: "khoi tao don hang",
      createdDate: new Date(),
    });
    const newBill = new Bill({
      id: billData.length + 1,
      order_id: orderData.length + 1,
      cilentName: dataRequest.client_name,
      price: dataRequest.price,
      card_number: dataRequest.bill.card_number,
      expired_month: dataRequest.bill.expired_month,
      expired_year: dataRequest.bill.expired_year,
      bank: dataRequest.bill.bank,
      card_type: dataRequest.bill.card_type,
      transaction_price: dataRequest.price,
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
    console.log("Added object:", newOrder);
    return res.status(500).send({ code: 500, mesg: "that bai XXX" });
  }
};

module.exports = { createOrder };
