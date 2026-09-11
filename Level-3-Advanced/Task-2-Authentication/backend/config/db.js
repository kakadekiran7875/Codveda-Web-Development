const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authshield_db';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB not reachable locally (${error.message}).`);
    console.log(`[Database] Using secure in-memory credential storage for instant zero-configuration testing.`);
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
