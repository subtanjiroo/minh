import React, { useState, useEffect } from "react";
import axios from "axios";
import { ORDER } from "../../utils/constants";
import "./QLC.css";
function QLC() {
    const [dataClient, setdataClient] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ giá trị tìm kiếm

 useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL + ORDER.listC}`).then((response)=>{setdataClient(response.data.data)})
 },[])
 const filteredMovies = dataClient.filter((client) =>
 client.name.toLowerCase().includes(searchTerm.toLowerCase())
);
useEffect(()=>{console.log(dataClient)},[dataClient])
const DLC = (Cid)=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL + ORDER.deleteC}`,{dataRequest:Cid}).then((response)=>{
            console.log(response)
            window.location.reload()
        })
}
const Sadd = (Cid)=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL + ORDER.SADD}`,{dataRequest:Cid}).then((response)=>{
        console.log(response)
    
        window.location.reload()
    })
}
const CIF = (ITEM) =>{
    window.location.href = `CIF?id=${ITEM}`;
  }

  return (
    <div>
      <div className="container">
        <div className="search">
          <input
            type="text"
            className="SS"
            name="search"
            placeholder="Tìm kiếm "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="textC">
          {filteredMovies.map((item, index) => (
            <div
              className="text"
              key={index}
              
            >
              <div className="title">{item.name}({item.role})</div>
              <div  className="B">
              <button
               
                  className="BB"
                  onClick={()=>{CIF(item._id)}}
                >
                  Details
                </button>
                <button
                  onClick={()=>{Sadd(item)}}
                  className="BB"
                >
                  Set ADMIN
                </button>
                <button
                  onClick={()=>{DLC(item)}}
                  className="BB"
                >
                  Delete
                </button>
                

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QLC