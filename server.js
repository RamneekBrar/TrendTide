const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 4000

const {MONGOURI} = require("./keys")


mongoose.connect(MONGOURI)
mongoose.connection.on("connected", () => {
    console.log("Successfully connected!!!");
})

mongoose.connection.on("error", (err) => {
    console.log("Error connecting!!!", err);
})


require("./Models/user")
require("./Models/post")

app.use(express.json())
app.use(require('./Routes/auth'))
app.use(require("./Routes/post"))
app.use(require("./Routes/user"))

app.listen(PORT, () => {
    console.log("Running on port ", PORT);
})