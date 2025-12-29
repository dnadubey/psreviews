const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const reviewRouter=require('./routes/reviewRoutes');
const { GridFSBucket } = require("mongodb");

const companyRouter = require("./routes/companyRoutes");

dotenv.config({ path: "./config.env" });

const app = express();

/* ---------- Middlewares ---------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

/* ---------- MongoDB Connection ---------- */
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

let gfsBucket;

mongoose.connect(DB).then(() => {
  console.log("✅ DB connection successful");

  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "logos",
  });

  app.set("gfsBucket", gfsBucket);
});

/* ---------- Routes ---------- */
app.use("/api/v1", companyRouter);
app.use('/api/v1/review',reviewRouter);

app.get("/review/:companyId", (req, res) => {
  res.sendFile(path.join(__dirname, "review.html"));
});

/* ---------- Server ---------- */
const PORT = 3000;
app.listen(PORT, () => {
  console.log("🚀 App running on port 3000");
});





















// const bodyParser = require('body-parser');
// const mongoose=require('mongoose');
// const path = require('path');
// const express=require('express');
// const dotenv=require("dotenv");
// const companyRouter=require('./routes/companyRoutes');
// const reviewRouter=require('./routes/reviewRoutes');
// const compaanyWithImageRouter=require('./routes/companyWithImage');

// const app=express();
// dotenv.config({path:'./config.env'});


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(bodyParser.json());




// const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);

// mongoose.connect(DB,).then((con)=>{
//   console.log("DB connection successfull");
//   });

//  app.use('/api/v1',companyRouter);
// //app.use('/api/v1',compaanyWithImageRouter);
// app.use('/api/v1/review',reviewRouter);
// app.get('/review/:companyId', (req, res) => {
//   res.sendFile(path.join(__dirname, 'review.html'));
// });
// const PORT=3000;
// app.listen(PORT,(req,res)=>{
//   console.log("app is running on port 3000")
// })