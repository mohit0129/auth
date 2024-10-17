// db.js
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://imohit313:12345@cluster.nea9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function () {
  // console.log('Connected to MongoDB');
// });

// module.exports = db;


// db.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://mohit10209:<db_password>@cluster.iqj4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
// const uri = 'mongodb://localhost:27017';

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose;
