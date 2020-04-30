const express = require('express');
const createError = require('http-errors')
const app = express();
const dotenv = require('dotenv').config()

//console.log(dotenv.parsed)

//middleware for POST request json body
app.use(express.json());

//middleware for POST request URL encoded body
app.use(express.urlencoded({ extended: true }));


// for GET testing
// app.all('/test/:id/:name',(req,res)=>{
//     console.log(req.params);
//     res.send(req.params);
// });

//for POST testing
app.all('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

require('./initDB')();

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

// 404 handler and pass to error handler
app.use((req, res, next) => {
    // const err = new Error("not found")
    // err.status = 404;
    // next(err);
    next(createError(404, 'Not Found'))
});

// error handler (all error call will come here)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server started on port '+ PORT);
});