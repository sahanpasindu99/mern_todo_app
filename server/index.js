const dotenv= require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

const port =process.env.PORT || 8022;

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
   console.log("Connected to DB");
 })
 .catch((e)=> {
  console.log(e);
  console.log("Connection error")
}
  )  

const authRoutes=require('./routes/authRoutes')
app.use('/',authRoutes)
 
app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });