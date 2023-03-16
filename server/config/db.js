const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error.message));
}

module.exports = db;