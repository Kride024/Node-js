const http = require("http");
const fs = require("fs");
const url = require("url");



const myServer = http.createServer((req,res)=>{
// console.log(req);
if(req.url === '/favicon.ico')return res.end();
const log = `${Date.now()}: ${req.url} New Req Received\n`;
const myUrl = url.parse(req.url, true);
console.log(myUrl);
fs.appendFile('log.txt',log,(err,data)=>{
    // res.end("Hello from server");
   switch(myUrl.pathname){
    case '/':
        res.end("Home Page");
        break;
    case '/about':
        const username=myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;
    case '/search':
        const search = myUrl.query.search_query;
        res.end("Here are your result for " + search);    
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





