const express = require("express");
const users = require("./MOCK_DATA.json");
const fs= require("fs");
const app = express();
const PORT = 8000;

//Middleware/Plugins
app.use(express.urlencoded({extended:false}));

//Routes
app.get('/users',(req,res)=>{
const html = `
<ul>
${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
</ul>`
return res.send(html);
});
// Note: To remove , use .join('') instead of .join(', ') 

// for alexa and smart devices request for json , its our hybrid server
app.get("/api/users",(req,res)=>{
    return res.json (users);
});

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id); //req.params: route parameters
    const user = users.find((user)=>user.id==id);
    return res.json(user);
})
.patch((req,res)=>{
    // const id = Number(req.params.id);
    // const user = users.find((user)=>user.id==id);
    return res.json({status:pending});
})
.delete((req,res)=>{
       //delete user with ID
    return res.json({status:pending});
})


app.post("/api/users",(req,res)=>{
    // TODO: Create new User
    const body = req.body;
    users.push({id: users.length +1 ,...body});
    console.log("Body",body);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        
            console.log({status: "successful", id: users.length});
            return res.json({status: "successful", id: users.length});
    });
   
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
