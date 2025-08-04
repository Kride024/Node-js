// const fs = require("fs");
// Sync...
// fs.writeFileSync('./test.txt', 'Hey There');

//Async
const fs = require("fs");

//Sync..
// fs.writeFileSync("./test.txt","Hello World");

//Async..
// fs.writeFile("./test.txt", "Hello World !! Async", (err) => {})


//Sync : return something
  const result = fs.readFileSync("./contact.txt","utf-8");
console.log(result);
//Asnc : Does'nt return something
  fs.readFile("./contact.txt", "utf-8",(err,result)=>{
    if(err){
      console.log("Error:",err);
    }
  else{
 console.log(result);
  }
  });
  
//! Append
 fs.appendFileSync("./test.txt",`${Date.now()} Hey There\n`); //Does'nt overwrite but write data after existing data

fs.cpSync("./test.txt","./copy.txt");//make copy file of available file
fs.unlinkSync("./copy.txt");//delete any file


console.log(fs.statSync("./test.txt").isFile());
// fs.mkdirSync("my-docs");//make directory
// fs.rmdirSync("my-docs");//remove directory

