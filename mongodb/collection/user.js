const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = Schema({
   name: String,
   email: String,
   password: String,
   admin: Boolean,
})
module.exports = mongoose.model('User', userSchema)