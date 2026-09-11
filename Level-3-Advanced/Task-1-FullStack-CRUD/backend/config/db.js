const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devlog_crud';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB not running locally (${error.message}).`);
    console.log(`[Database] Activating High-Reliability Local Data Engine for zero-configuration testing.`);
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
