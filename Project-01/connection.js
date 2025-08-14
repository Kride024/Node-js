const mongoose = require("mongoose"); // Import mongoose to connect to MongoDB

//Connection
async function connectMongoDb(url){
    //Connection
return mongoose.connect(url);

}

module.exports = {
    connectMongoDb,
};