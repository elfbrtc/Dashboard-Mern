const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Please enter a company name'],
    },
    companyLegalNumber: {
        type: String,
        required: [true, 'Please enter a company legal number'],
    },
    companyCountry: {
        type: String,
        required: [true, 'Please enter a country'],
    },
    companyWebsite: {
        type: String,
        required: [true, 'Please enter a company website'],
    }
},
{ 
    timestamps: true ,
    versionKey: false
})

module.exports = mongoose.model('Company', companySchema);