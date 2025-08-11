const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");


const app = express();

app.get('/',(req,res)=>{
    return res.send("Hello from Home Page");
})

app.get("/about",(req,res)=>{
    return res.send("Hello from About Page");
})
// mujhe koi aaise library chahiye jo mera my handler function ko likh de



function myHandler(req,res){
// console.log(req);
if(req.url === '/favicon.ico')return res.end();
const log = `${Date.now()}: ${req.url} New Req Received\n`;
const myUrl = url.parse(req.url, true);
console.log(myUrl);
fs.appendFile('log.txt',log,(err,data)=>{
    // res.end("Hello from server");
   switch(myUrl.pathname){
    case '/':
        // res.end("Home Page");
        if(res.method === "GET")
            res.end("HomePage");
            break;
    case '/about':
        const username=myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;
    case '/search':
        const search = myUrl.query.search_query;
        res.end("Here are your result for " + search);  
    case '/signup':
        if(req.method === "GET")res.end("This is a signup Form");
        else if (req.method === "POST")res.end("Success");
        break;      
    default:
        res.end("404 Not Found");        
   }
})
};

const myServer = http.createServer(app);

//!  you can even send entire html 

//if you have multiple server, ekk port pe ekk hi server chaal shakta hai
myServer.listen(8000,()=>console.log("Server started Again!")
);

// now we will make log for any incoming request

//! url stand for uniform resources locator

// https://www.piyushgarg.dev/

// for header use different package and for json use different module


//? Express js





