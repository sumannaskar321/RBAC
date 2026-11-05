const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/user-role-permission');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI,
            {dbName: process.env.MONGO_DB_NAME}
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

module.exports = { connectDB };