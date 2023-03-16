const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    }

},
{ 
    timestamps: true 
})

module.exports = mongoose.model('User', userSchema);