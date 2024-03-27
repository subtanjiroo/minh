const ORDER = {
  addMovie: "movie_order/add_movie",
  getMovie: "movie_order/get_movie",
  addCilent: "cilentIF/register",
  getCilent: "cilentIF/login",
  addRoom: "Room/addR",
  getRoom: "Room/getR",
  addOrder: "Order/addOrder",
  getOrder: "Order/getOrder",
  verifyLogin: "AUUser/verifyLogin",
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
