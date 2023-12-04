const mongoose = require("mongoose")
const url = process.env.MONGO_DB_CONNECTION_STRING
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

connect.then(db => {
    console.log("connected to db")
    if (process.send) process.send("ready") // tell pm2 we are good to go
}).catch(err => {
    console.log(err)
    process.exit(1)
})
