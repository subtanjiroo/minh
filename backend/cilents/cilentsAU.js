// const mongoose = require("mongoose");
// const Client = require("../models/cilent");
// const CryptoJs = require("crypto-js");
// const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");

// dotenv.config();

// const date = new Date();

// const registerClient = async (req, res) => {
//   try {
//     const dataRequest = req.body.dataRequest;
//     const emailValidate = dataRequest.email;
//     if (emailValidate) {
//       const clientValidate = await Client.findOne({ email: dataRequest.email });
//       if (clientValidate) {
//         return res.status(200).send({
//           code: 500,
//           mesg: "Email này đã tồn tại, vui lòng thử lại email khác!",
//         });
//       } else {
//         const newClient = new Client({
//           name: dataRequest.name,
//           email: dataRequest.email,
//           phone_number: dataRequest.phone_number,
//           BoD: dataRequest.BoD,
//           address: dataRequest.address,
//           password: CryptoJs.AES.encrypt(
//             dataRequest.password,
//             process.env.PASS_SECRECT
//           ).toString(),
//           role: dataRequest.role,
//           created_date: date,
//         });
//         try {
//           await newClient.save();
//           return res
//             .status(200)
//             .send({ code: 200, mesg: "Đã đăng ký thành công" });
//         } catch (error) {
//           return res
//             .status(200)
//             .send({ code: 500, mesg: "Không thể đăng ký user này" });
//         }
//       }
//     } else {
//       return res
//         .status(500)
//         .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
//   }
// };

// const loginClient = async (req, res) => {
//   try {
//     const dataRequest = req.body.dataRequest;
//     const clientValidate = await Client.findOne({
//       email: dataRequest.username,
//     });
//     if (!clientValidate) {
//       return res
//         .status(401)
//         .send({ code: 401, mesg: "Email này không tồn tại! Vui lòng đăng ký" });
//     }

//     const passwordDecrypt = CryptoJs.AES.decrypt(
//       clientValidate.password,
//       process.env.PASS_SECRECT
//     );
//     const originalPassword = passwordDecrypt.toString(CryptoJs.enc.Utf8);

//     if (originalPassword !== dataRequest.password) {
//       return res
//         .status(401)
//         .send({ code: 401, mesg: "Password không đúng! Vui lòng thử lại" });
//     }

//     const accessToken = jwt.sign(
//       { id: clientValidate.id, email: clientValidate.email },
//       process.env.PASS_JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     const dataReturn = {
//       id: clientValidate.id,
//       email: clientValidate.email,
//       phone_number: clientValidate.phone_number,
//       role: clientValidate.role,
//       accessToken: accessToken,
//     };
//     return res.status(200).send({ code: 200, data: dataReturn });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
//   }
// };

// module.exports = { registerClient, loginClient };
