const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
// console.log(req);
if(req.url === '/favicon.ico')return res.end();
const log = `${Date.now()}: ${req.url} New Req Received\n`;
fs.appendFile('log.txt',log,(err,data)=>{
    // res.end("Hello from server");
   switch(req.url){
    case '/':
        res.end("Home Page");
        break;
    case '/about':
        res.end("I am Kriti Yadav on about us Page");
        break;
    default:
        res.end("404 Not Found");        
   }
});
// res.end("Hello From Server");
});

//!  you can even send entire html 

//if you have multiple server, ekk port pe ekk hi server chaal shakta hai
myServer.listen(8000,()=>console.log("Server started Again!")
);

// now we will make log for any incoming request

//! url stand for uniform resources locator

// https://www.piyushgarg.dev/





