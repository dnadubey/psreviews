const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const express=require('express');
const dotenv=require("dotenv");
const companyRouter=require('./routes/companyRoutes');

const app=express();
dotenv.config({path:'./config.env'});

app.use(express.json());
app.use(bodyParser.json());




const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);

mongoose.connect(DB,).then((con)=>{
  console.log("DB connection successfull");
  });


app.use('/api/v1',companyRouter);
app.get('/review', (req, res) => {
  res.sendFile(path.join(__dirname, 'review.html'));
});
const PORT=3000;
app.listen(PORT,(req,res)=>{
  console.log("app is running on port 3000")
})