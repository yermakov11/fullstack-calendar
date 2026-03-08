const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to the database successfully.');
  } catch (e) {
    console.error('Failed to connect to the database:', e);
    process.exit(1);
  }
};

module.exports = connectDB;