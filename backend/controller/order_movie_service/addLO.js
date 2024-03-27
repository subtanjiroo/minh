const mongoose = require("mongoose");
const LO = require("../../models/logOrder");
const addLO = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;
    const newLO = new LO({
      id: dataRequest.id,
      dataRequest: dataRequest.dataRequest,
      ipAddress: dataRequest.ipAddress,
      userAgent: dataRequest.userAgent,
      contentType: dataRequest.contentType,
      userName: dataRequest.userName,
      status: dataRequest.status,
      status_order_desciption: dataRequest.status_order_desciption,
      createdDate: new Date(),
    });
    const addedLO = await newLO.save();
    return res
      .status(200)
      .send({ code: 200, mesg: "log cilents have been added", data: addedLO });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "luu that bai da co loi say ra" });
  }
};
const getLO = async (req, res) => {
  try {
    const idLO = req.query.filter;
    var LOS;
    if (idLO) {
      LOS = await LO.findOne({ id: idLO });
    } else {
      LOS = await LO.find();
    }
    if (!LOS) {
      return res.status(404).json({ code: 404, mesg: "Order not found" });
    }
    return res.status(200).json({ code: 200, data: LOS });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, mesg: "Đã có lỗi xảy ra vui lòng thực hiện lại!" });
  }
};

module.exports = { addLO, getLO };
