const server = require('./server');
const { PORT, MONGO_URI } = require('./config');
const mongoose = require('mongoose');

var env = require('node-env-file'); // .env file
env(__dirname + '/.env');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(() => {
  server.listen(PORT, () => {
    console.log(`CodingApp backend running on port ${PORT}`);
  });
}).catch(console.log('')) 

