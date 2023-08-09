const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI, {
  dbName: process.env.DATABASE_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority',
  ssl: process.env.DATABASE_ENABLE_SSL === 'TRUE',
  keepAlive: true,
  keepAliveInitialDelay: 300000,  
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('mongoDB error message : ', err.message)
});
db.once('open', () => {
  console.log('Connected to MongoDB database!')
  require('require-dir')('./models');
});

module.exports = mongoose;