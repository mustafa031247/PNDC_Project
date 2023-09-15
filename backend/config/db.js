
const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log(`Mongo Db Connect At the host:\t ${conn.connection.host}`)
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit();
    }

}

module.exports = connectDb;