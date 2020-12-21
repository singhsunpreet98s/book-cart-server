const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ordersSchema = Schema({
   bookId: String,
   bookName: String,
   price: Number,
   buyer: String,
   dop: Date,

})
module.exports = mongoose.model('orders', ordersSchema)