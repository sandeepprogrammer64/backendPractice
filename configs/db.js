
require('dotenv').config()
// console.log(process.env)
const mongoose = require("mongoose");


const connection  = mongoose.connect(process.env.mongo_url)


module.exports = {connection}