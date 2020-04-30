const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Product schema
const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

//Product Model
const Product = mongoose.model('product', ProductSchema)
module.exports = Product;