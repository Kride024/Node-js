const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
     const user = await User.findById(req.params.id); // Find user by ID from MongoDB
    if(!user)return res.status(404).json({error: "user not found"});
    // if user not found, return 404 status code with error message
    return res.json(user);
}

async function handleUpdateUserById(req,res){
     const user = await User.findById(req.params.id); // Find user by ID from MongoDB
      await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"});// update user by id in mongodb
    return res.json({status:"success" , message: "User updated successfully"});
}

async function handleDeleteUserById(req,res){
     try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "Successfully deleted user" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleCreateUserById(req,res){
 
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

   const result = await User.create ({
    firstName: body.first_name,
    lastName: body.last_name,
    email:body.email,
    gender: body.gender,
    jobTitle:body.job_title,
   });
   
   return res.status(201).json({msg: "successful", id: result._id});
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById
}; 