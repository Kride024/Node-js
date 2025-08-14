const express = require("express");
// const users = require("./MOCK_DATA.json");
const { logReqRes} = require("./middlewares");

const { connectMongoDb} = require("./connection");

const userRouter = require("./routes/user"); // Import user routes


const app = express();
const PORT = 8000;

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1');

app.use(express.urlencoded({extended:false}));
//urlencoded work a/c to header(content-type) they decide is it needed to parse or not , let us available in req.body
 
app.use(logReqRes("log.txt")); // Use logReqRes middleware to log requests and responses


//Routes
app.use("/user",userRouter); // Use user  routes for /user path

app.listen(PORT,()=>console.log(`server started at Port ${PORT}`));
