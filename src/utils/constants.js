
const ORDER = {
  addMovie: "movie_order/add_movie",
  getMovie: "movie_order/get_movie",
  addCilent: "cilentIF/register",
  getCilent: "cilentIF/login",
  addRoom: "Room/addR",
  getRoom: "Room/getR",
  movie_order: "movie_order/create_order",
  getOrder: "Order/getOrder",
  verifyLogin: "AUUser/verifyLogin",
  UpS: "movie_order/UpS",
  DeleteMovie:"movie_order/Delete",
  UpdateMoviee:"movie_order/UdM",
  listC:"cilentIF/list",
  deleteC:"cilentIF/deleteC",
  SADD:"cilentIF/SADD",
  SOO:"cilentIF/SOO",
  DPS:"cilentIF/DPS",
  UHS:"cilentIF/UHS",
  LS:"movie_order/LS"
};
const getCookieValue = (cookieName) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};
module.exports = { ORDER, getCookieValue };
