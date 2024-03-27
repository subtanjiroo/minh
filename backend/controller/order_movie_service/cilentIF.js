const mongoose = require("mongoose");
const Client = require("../../models/cilent");
const CryptoJs = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const date = new Date();

const registerClient = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;
    const emailValidate = dataRequest.email;
    if (emailValidate) {
      const clientValidate = await Client.findOne({ email: dataRequest.email });
      if (clientValidate) {
        return res.status(200).send({
          code: 400,
          mesg: "Email này đã tồn tại, vui lòng thử lại email khác!",
        });
      } else {
        const userData = await Client.find(); //[{},{}]
        const registerClient = new Client({
          id: userData.length + 1,
          name: dataRequest.name,
          email: dataRequest.email,
          phone_number: dataRequest.phoneNumber,
          BoD: dataRequest.BoD,
          address: dataRequest.address,
          password: CryptoJs.AES.encrypt(
            dataRequest.password,
            process.env.PASS_SECRECT
          ).toString(),
          role: dataRequest.role,
          created_date: date,
        });
        try {
          await registerClient.save();
          return res
            .status(200)
            .send({ code: 200, mesg: "Đã đăng ký thành công" });
        } catch (error) {
          return res
            .status(200)
            .send({ code: 300, mesg: "Không thể đăng ký user này" });
        }
      }
    } else {
      return res
        .status(500)
        .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
  }
};

const loginClient = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;
    const clientValidate = await Client.findOne({
      email: dataRequest.email,
    });
    !clientValidate &&
      res
        .status(200)
        .send({ code: 401, mesg: "Email này không tồn tại! Vui lòng đăng ký" });

    const decryptedPassword = CryptoJs.AES.decrypt(
      clientValidate.password,
      process.env.PASS_SECRECT
    ).toString(CryptoJs.enc.Utf8);

    if (decryptedPassword !== dataRequest.password) {
      return res
        .status(200)
        .send({ code: 402, mesg: "Password không đúng! Vui lòng thử lại" });
    }

    const accessToken = jwt.sign(
      { id: clientValidate.id, email: clientValidate.email },
      process.env.PASS_JWT_SECRECT,
      { expiresIn: "1d" }
    );
    const dataReturn = {
      id: clientValidate.id,
      email: clientValidate.email,
      accessToken: accessToken,
    };
    return res
      .status(200)
      .send({ code: 200, mesg: "dang nhap thanh cong", data: dataReturn });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
  }
};

module.exports = { registerClient, loginClient };
