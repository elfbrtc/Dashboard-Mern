const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please enter a product name'],
    },
    productCategory: {
        type: String,
        required: [true, 'Please enter a product category'],
    },
    productAmount: {
        type: String,
        required: [true, 'Please enter a product amount'],
    },
    productAmountUnit: {
        type: String,
        required: [true, 'Please enter a product amount unit']
    },
    productCompany: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter a product product company'],
        ref: 'Company'
    }
},
{ 
    timestamps: true 
})

module.exports = mongoose.model('Product', productSchema);