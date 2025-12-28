const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;

mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("logos");
});

module.exports = () => gfs;
