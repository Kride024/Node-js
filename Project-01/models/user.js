const mongoose = require("mongoose"); // Import mongoose to connect to MongoDB

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

// Export the model
module.exports = User; //Export the User model to use in other files

