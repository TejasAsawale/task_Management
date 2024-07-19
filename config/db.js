const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Task_management");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("error in server connection", error);
    }
}

module.exports = {connectDB};
