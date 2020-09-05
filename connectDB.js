const mongoose = require('mongoose');
require('dotenv').config();

try {
    mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true,  useUnifiedTopology: true });
    console.log('MongoDB connected ... !!')
} catch(err) {
    console.error(err);    
}

module.exports = mongoose;