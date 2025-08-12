const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;


//Routes

app.get("/api/users",(req,res)=>{
    return res.json (users);
});

app.get('/users',(req,res)=>{
const html = `
<ul>
${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
</ul>`
return res.send(html);
});
// Note: To remove , use .join('') instead of .join(', ') 

app.listen(PORT,()=>console.log(`server started at Port ${PORT}`));
