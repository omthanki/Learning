const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://0.0.0.0:27017/om", { useNewUrlParser: true, useUnifiedTopology: true})
.then (() => { console.log("Connection successful") })
.catch((err) => { console.log("No connection: " + err)})