require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database"); 

const app = express();
app.use(express.json());

const router = require("./routes");
app.use("/api", router);

app.get("/hello", (req, res) => {
    res.status(200).json({msg: "hello"});
});

const port = process.env.PORT || 5000;

async function startServer(){
    await connectToMongoDB();

    app.listen(port,  () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
}

startServer()