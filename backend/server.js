const express = require("express")
const chats = require("./data/chats")
const dotenv = require("dotenv")
const connectDb = require("./config/db")
const userRoutes = require("./routes/UserRoutes")
const chatRoutes = require("./routes/chatRoutes");
const { noFound, errorHandler } = require("./errorHandling/errorHandling")

dotenv.config()
connectDb();
const app = express()
app.use(express.json()) //Bcz we send Json Data from FrontEND
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Listen  on Port ${PORT}`))


app.get("/api/chats", (req, res) => {
    res.send(chats)
    // console.log(req.params.id)

})


app.get("/", (req, res) => {
    res.send("Getting Response")
    // console.log(req.params.id)

})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)


app.use(noFound);
app.use(errorHandler);
app.get("/api/chats/:id", (req, res) => {
    // res.send(chats)
    console.log(req.params.id)
    let singleChat = chats.find(c => c._id === req.params.id)
    // let singleChat = chats.map((items) => {
    //     items._id === req.params.id ? items : "Not Found"
    // })
    res.send(singleChat)
})
