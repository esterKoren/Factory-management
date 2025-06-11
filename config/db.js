const mongoose = require('mongoose');

const connectDB = async () => {
  try {
 
    const mongoURI = process.env.DB_URI 

    await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB connected successfully to ${mongoURI}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
