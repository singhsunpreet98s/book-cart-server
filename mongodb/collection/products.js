const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = Schema({
   title: String,
   description: String,
   img: String,
   author: String,
   price: Number,
   quantity: Number
})
module.exports = mongoose.model('Product', productSchema)