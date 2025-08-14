const express = require("express");
const {handleGetAllUsers, handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateUserById}= require("../controllers/user");

const router = express.Router();

//Routes

// Note: To remove , use .join('') instead of .join(', ') 

// for alexa and smart devices request for json , its our hybrid server


router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);


router.route("/")
.post(handleCreateUserById) // Create a new user
.get(handleGetAllUsers); // Get all users
module.export = router; // Export the router to use in other files