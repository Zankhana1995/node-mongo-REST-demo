const createError = require('http-errors')
const mongoose = require('mongoose')
const Product = require('../Models/Product.model')
module.exports ={
    getAllProducts: async (req, res, next) => {
        try {
    
            //fetch all products
            //const result = await Product.find()
    
            //remove some particular feild from all records
            // first {} is for query and second {} is for projection
            const result = await Product.find({}, { __v: 0 });
    
            //only want some particular feild in the result
            //const result = await Product.find({}, { name: 1, price:1, _id:0 });
    
            // query example
            //const result = await Product.find({ price: 999},{});
    
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    createNewProduct:async (req, res, next) => {
        // with async await
        try {
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result);
        } catch (error) {
            console.log(error.message)
            if(error.name==='ValidationError')
            {
                next(createError(422,error.message))
                return
            }
            next(error)
        }
    
        // with then syntax
    
        // console.log(req.body)
        // const product = new Product({
        //     name: req.body.name,
        //     price: req.body.price
        // }) 
        // product.save()
        // .then(result => {
        //     console.log("result")
        //     res.send(result)
        // })
        // .catch(err =>{
        //     console.log(err.message);
        // })
    },
    findProductById:async (req, res, next) => {  
        try {
            const id = req.params.id;
            const result = await Product.findById(id);
            //const result = await Product.findOne({ _id: id });
            if(!result){
                throw createError(404, 'Product does not exist.')
            }
            res.send(result)
    
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                next(createError(400, 'Invalid product Id'))
                return
            }
            next(error);
        }
    },
    updateAProduct:async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {new : true}
            const result = await Product.findByIdAndUpdate(id,updates, options)
            if(!result){
                throw createError(404, 'Product does not exist.')
            }
            res.send(result);
        } catch (error) {
            console.log(error.message)
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                return next(createError(400, 'Invalid product Id'))           
            }
            next(error);
        }
    },
    deleteAProduct:async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Product.findByIdAndDelete(id);
            if(!result){
                throw createError(404, 'Product does not exist.')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                next(createError(400, 'Invalid product Id'))
                return
            }
            next(error);
        }
    }
}