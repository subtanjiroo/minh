const mongoose = require("mongoose");
const Movie = require("../../models/movies");

const addMovie = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;
    const MData = await Movie.find(); //[{},{}]

    const newMovie = new Movie({
      id: MData.length + 1,
      title: dataRequest.title,
      category: dataRequest.category,
      description: dataRequest.description,
      releaseDate: dataRequest.releaseDate,
      duration: dataRequest.duration,
      actors: dataRequest.actors,
      author: dataRequest.author,
      timeStart: dataRequest.timeStart,
      img: dataRequest.img,
      price: dataRequest.price,
      roomNumber: dataRequest.roomNumber,
      chinhanh: dataRequest.chinhanh,
      modifyDate: dataRequest.modifyDate,
      createdDate: new Date(),
    });

    const addedMovie = await newMovie.save();
    return res
      .status(200)
      .send({ code: 200, mesg: "Lưu dữ liệu thành công!", data: addedMovie });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, mesg: "Đã có lỗi xảy ra" });
  }
};

const getMovie = async (req, res) => {
  try {
    const idProduct = req.query.filter;
    var movies;
    if (idProduct) {
      movies = await Movie.findOne({ _id: idProduct });
    } else {
      movies = await Movie.find().sort({ createdDate: -1 });    }
console.log("ip cua movie la:",idProduct)
    if (!movies) {
      // Handle case where movie is not found
      return res.status(404).json({ code: 404, message: "Movie not found" });
    }

    return res.status(200).json({ code: 200, data: movies });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "Đã có lỗi xảy ra vui lòng thực hiện lại!" });
  }
};
const getMovieList = async (req, res) => {
  try {
    var filters = {};
    var { category, title, author } = req.query;
    var categoryArr = [];
    if (category) {
      categoryArr.push(category.split(","));
      filters.category = { $in: categoryArr[0] };
    }
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
    if (author) {
      filters.author = { $regex: author, $options: "i" };
    }
    var movies;
    movies = await Movie.find(filters);
    if (!movies) {
      // Handle case where movie is not found
      return res.status(404).json({ code: 404, message: "Movie not found" });
    }

    return res.status(200).json({ code: 200, data: movies });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, mesg: "Đã có lỗi xảy ra vui lòng thực hiện lại!" });
  }
};
const getCategory = async (req, res) => {
  try {
    var filters = {};
    var movies;
    movies = await Movie.find(filters, { category: 1, _id: 0 });
    const uniCategory = [
      ...new Set(movies.map((movie) => movie.category).flat()),
    ];
    return res.status(200).json({ code: 200, date: uniCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "da co loi xay ra XXD" });
  }
};
const updateMovie = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;

  
    const movie = await Movie.findOneAndUpdate(
      {
        _id: dataRequest._id,
      },
      {
        $set: {
          title: dataRequest.title,
          author: dataRequest.author,
          actors: dataRequest.actors,
          img: dataRequest.img,
          category: dataRequest.category,
          description: dataRequest.description,
          releaseDate: dataRequest.releaseDate,
          price: dataRequest.price,
          chinhanh: dataRequest.chinhanh,
          roomNumber: dataRequest.roomNumber,
          duration: dataRequest.duration,
          timeStart: dataRequest.timeStart
        }
      },
      {
        new: true,
      }
    );

    // Cập nhật trạng thái isOccupied cho từng ghế trong cơ sở dữ liệu
    if(dataRequest.seatsC){
    for (const seat of dataRequest.seatsC) {
     
     const UMV = await Movie.updateOne(
        {
          "_id": dataRequest._id,
          
        },
        {
          $set: {
            "timeStart.$[outer].time.$[inner].seats.$[elem].isOccupied": seat.isOccupied
          }
        },
        {
          new: true,
          arrayFilters: [{ "outer.date": seat.date },
          { "inner.timeR": seat.time },
            { "elem.seatNumber": seat.seatNumber },
          

        ]
        }
      );
      console.log(UMV)
    }
}
    return res.status(200).send({
      code: 200,
      mesg: "Thành công",
      data: movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "Cập nhật không thành công" });
  }
};



const DeleteMovie = async (req,res)=>{
  try {
    const dataRequest = req.body.dataRequest;
    const movie = await Movie.findOneAndDelete(
      {
        _id:dataRequest
      }
    )  
    console.log(movie);
    if (!movie) {
      return res.status(404).json({ code: 404, mesg: "Không tìm thấy phim" });
    }
    return res.status(200).send({
      code: 200,
      mesg: "Xóa thành công",
      data: movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, mesg: "xoa ko thanh cong" });
  }
}
module.exports = { addMovie, getMovie, getMovieList, getCategory,updateMovie,DeleteMovie};
