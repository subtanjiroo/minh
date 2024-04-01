const mongoose = require("mongoose");
const Movie = require("../../models/movies");

const addMovie = async (req, res) => {
  try {
    const dataRequest = req.body.dataRequest;
    const MData = await Client.find(); //[{},{}]

    const newMovie = new Movie({
      id: MData.length + 1,
      title: dataRequest.title,
      category: dataRequest.category,
      description: dataRequest.description,
      releaseDate: dataRequest.releaseDate,
      time: dataRequest.time,
      actors: dataRequest.actors,
      author: dataRequest.author,
      img: dataRequest.img,
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
      movies = await Movie.findOne({ id: idProduct });
    } else {
      movies = await Movie.find();
    }

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
module.exports = { addMovie, getMovie, getMovieList, getCategory };
