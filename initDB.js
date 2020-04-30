const mongoose = require('mongoose')
module.exports = () =>{

//below line to connect mongodb local
// mongoose.connect('mongodb://localhost:27017/dbName', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('MongoDb connected')
// })

// connect with mongoDB atlas
mongoose.connect(process.env.MONGODB_URI
, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDb connected')
})
.catch(err =>
    console.log(err.message));

mongoose.connection.on('connected', () => {
console.log("Mongoose Connected to db..")
})

mongoose.connection.on('error', (err) => {
console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
console.log("Mongoose Connection is disconnected.")
})

process.on('SIGINT', () => {
mongoose.connection.close(() => {
    console.log('Mongoose connection is disconnected due to app termination.');
    process.exit(0);
});
});
}