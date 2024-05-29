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
          phone_number: dataRequest.phone_number,
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
const ShowClient = async (req,res) =>{
  try {
    const clientValidate = await Client.find({})
    return res
    .status(200)
    .send({ code: 200, mesg: "lay du lieu success", data: clientValidate });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
  }
}
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

        const decryptedPassword = await CryptoJs.AES.decrypt(
          clientValidate.password,
          process.env.PASS_SECRECT
        ).toString(CryptoJs.enc.Utf8);
 
    if (decryptedPassword != dataRequest.password) {
     
      return res
        .status(200)
        .send({ code: 402, mesg: "Password không đúng! Vui lòng thử lại", data: decryptedPassword});
    }

    const accessToken = jwt.sign(
      { _id: clientValidate._id, email: clientValidate.email },
      process.env.PASS_JWT_SECRECT,
      { expiresIn: "1d" }
    );
    const dataReturn = {
      _id: clientValidate._id,
      email: clientValidate.email,
      accessToken: accessToken,
    };
    console.log(dataReturn)
    return res
      .status(200)
      .send({ code: 200, mesg: "dang nhap thanh cong", data: dataReturn });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, mesg: "Không thể thực hiện! Vui lòng thử lại sau" });
  }
};


const DPS = async (req,res)=>{
  try {
    const dataRequest = req.body.dataRequest;
    console.log(dataRequest)
    const decryptedPassword = await CryptoJs.AES.decrypt(
      dataRequest,
      process.env.PASS_SECRECT
    ).toString(CryptoJs.enc.Utf8);
    const passwordLength = decryptedPassword.length;
    console.log(passwordLength)
    return res
    .status(200)
    .send({ code: 200, mesg: "thanh cong", data: passwordLength});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "loi DPS" });
  }
}
const UHS = async (req,res)=>{
  try {
    const dataRequest = req.body.dataRequest;
    const decryptedPassword = await CryptoJs.AES.decrypt(
      dataRequest.password,
      process.env.PASS_SECRECT
    ).toString(CryptoJs.enc.Utf8);
    console.log(decryptedPassword)

    let HS;
    if(dataRequest.curPassword == decryptedPassword){
     const newPass = CryptoJs.AES.encrypt(
      dataRequest.newPassword,
      process.env.PASS_SECRECT
    ).toString()
    console.log(dataRequest)
      HS = await Client.findOneAndUpdate({
        _id:dataRequest._id
      },
      {
        $set:{
          name:dataRequest.name,
          password:newPass,
          email:dataRequest.email,
          phone_number:dataRequest.phone_number,
          BoD:dataRequest.BoD,
        }
      },
      {
        new:true
      })
      console.log(HS)
    }else{
      return res.status(200).send({code:403,mesg:"mật khẩu hiện tại bạn vừa nhập sai"})
    }
   
    return res
    .status(200)
    .send({ code: 200, mesg: "thanh cong", data: HS });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "loi UHS" });
  }
}

const DeleteC= async (req,res)=>{
  try {
    const dataRequest = req.body.dataRequest;
    const customer = await Client.findOneAndDelete(
      {
        _id:dataRequest
      }
    )  
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ code: 404, mesg: "Không tìm thấy Customer" });
    }
    return res.status(200).send({
      code: 200,
      mesg: "Xóa thành công",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "xoa ko thanh cong" });
  }
}
const showone= async (req,res)=>{
  try {
    const dataRequest = req.body.dataRequest;
    const customer = await Client.findOne(
      {
        _id:dataRequest
      }
    )  
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ code: 404, mesg: "Không tìm thấy Customer" });
    }
    return res.status(200).send({
      code: 200,
      mesg: "Xóa thành công",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "xoa ko thanh cong" });
  }
}
const setAD= async (req,res)=>{
  try {
    const dataRequest = req.body.dataRequest;
    const KQ = await dataRequest.role == "admin" ? "client" : "admin";
    const customer = await Client.findOneAndUpdate(
      {
        _id:dataRequest
      },{
        role:KQ
      },{
        new:true
      }
    )  
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ code: 404, mesg: "Không tìm thấy customer" });
    }
    return res.status(200).send({
      code: 200,
      mesg: " thành công",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: " ko thanh cong" });
  }
}
module.exports = { registerClient, loginClient,ShowClient,DeleteC,setAD ,showone,DPS,UHS};
