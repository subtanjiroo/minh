const mongoose = require("mongoose");
const LC = require("../../models/logCilent");
const addLC = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;
    const newLC = new LC({
      id: dataRequest.id,
      action: dataRequest.action,
      ipadress: dataRequest.ipadress,
      user_agent: dataRequest.user_agent,
      content_type: dataRequest.content_type,
      username: dataRequest.username,
      createdDate: new Date(),
    });
    const addedLC = await newLC.save();
    return res
      .status(200)
      .send({ code: 200, mesg: "log cilents have been added", data: addedLC });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "luu that bai da co loi say ra" });
  }
};
const getLC = async (req, res) => {
  try {
    const idLC = req.query.filter;
    var LCS;
    if (idLC) {
      LCS = await LC.findOne({ id: idLC });
    } else {
      LCS = await LC.find();
    }
    if (!LCS) {
      return res.status(404).json({ code: 404, mesg: "Order not found" });
    }
    return res.status(200).json({ code: 200, data: LCS });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, mesg: "Đã có lỗi xảy ra vui lòng thực hiện lại!" });
  }
};

module.exports = { addLC, getLC };
