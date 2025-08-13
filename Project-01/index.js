const express = require("express");
const users = require("./MOCK_DATA.json");
const fs= require("fs");
const mongoose = require("mongoose"); // Import mongoose to connect to MongoDB
const app = express();
const PORT = 8000;

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log('MongoDB CONNECTED')
).catch((err)=>console.log("Mongo error",err))


// Schema - Define the structure
const userSchema = new mongoose.Schema({
   firstName: {
    type: String,
    required:true,
   },
   lastName:{
    type: String,
   },
   email: {
    type:String,
    required:true,
    unique:true, //to ensure no duplicate
   },
   jobTitle: {
    type: String,
   },
   gender:{
    type: String,
   },


}
,{timestamps:true}
);

// Create a model from the schema
const User = mongoose.model("user",userSchema); // itself it change the name of collection to users from user 


//Middleware/Plugins
//middleware is a function that runs before the request reaches the route handler, and in middleware you can edit , use , display req data 
app.use(express.urlencoded({extended:false}));
//urlencoded work a/c to header(content-type) they decide is it needed to parse or not , let us available in req.body

app.use((req,res,next)=>{
    console.log("Hello from Middleware 1");
    next(); //to go to next middleware
});
app.use((req,res,next)=>{
    console.log("Hello from Middleware 2");
    next(); //to go to next middleware
});

//Routes
app.get('/users',async (req,res)=>{
    const allDbUsers = await User.find({});
const html = `
<ul>
${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join('')}
</ul>`
return res.send(html);
});
// Note: To remove , use .join('') instead of .join(', ') 

// for alexa and smart devices request for json , its our hybrid server
app.get("/api/users",async(req,res)=>{
    const allDbUsers = await User.find({});
    
    // res.setHeader("X-myName","Piyush Garg"); //setHeader is used to set custom Headers
   //Always add X- in custom headers
    return res.json (allDbUsers);// to send json data;
});

app.route("/api/users/:id").get(async(req,res)=>{
    // const id = Number(req.params.id); //req.params: route parameters
    // const user = users.find((user)=>user.id==id);
    const user = await User.findById(req.params.id); // Find user by ID from MongoDB
    if(!user)return res.status(404).json({error: "user not found"});
    // if user not found, return 404 status code with error message
    return res.json(user);
})
.patch(async(req,res)=>{
    // const id = Number(req.params.id);
    // const user = users.find((user)=>user.id==id);
    await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"});// update user by id in mongodb
    return res.json({status:"success" , message: "User updated successfully"});
})
.delete(async(req,res)=>{
    //    await User.findByIdAndDelete(req.params.id); // Delete user by ID from MongoDB
    // return res.json({status:"Successfully deleted User"});
      try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "Successfully deleted user" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/users",async(req,res)=>{
    // TODO: Create new User
    
    
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({msg: "All field are required..."});
    }


  //! Create a new user
    // users.push({id: users.length +1 ,...body});
    // console.log("Body",body);
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        
    //         console.log({status: "successful", id: users.length});
    //         return res.json({status: "successful", id: users.length});
    // });

   const result = await User.create ({
    firstName: body.first_name,
    lastName: body.last_name,
    email:body.email,
    gender: body.gender,
    jobTitle:body.job_title,
   });
   
   return res.status(201).json({msg: "successful"});
}); 

// app.patch("/api/users/:id",(req,res)=>{
//     // TODO: Edit User with ID
//     return res.json({status: "pending"});
// });

// app.Delete("/api/users/:id",(req,res)=>{
//     // TODO: DELETE user with ID
//     return res.json({status: "pending"});
// });

app.listen(PORT,()=>console.log(`server started at Port ${PORT}`));
