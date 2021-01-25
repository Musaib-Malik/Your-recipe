// Import mongoose
const mongoose = require("mongoose");

// Connect to mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected with database");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Export DB
module.exports = connectDB;
