const mongoose=require('mongoose')


// Function to connect to MongoDB using Mongoose
async function mongo_connect(url)
{
    return mongoose.connect(url)    //Connecting to the MongoDB database
}

module.exports={
    mongo_connect
}