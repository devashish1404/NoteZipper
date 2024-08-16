const express = require ('express');
const cors= require('cors')
const mongoose = require('mongoose');
const dotEnv = require('dotenv')

const app =  express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotEnv.config();

const routes = require("./src/routes/userRoute")

const PORT = process.env.PORT || 9595;
const URL = process.env.MONGOURL;

mongoose.connect(URL). then(()=>{

    console.log("DB connected succesfully");

    app.use("/v1", routes);

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));




