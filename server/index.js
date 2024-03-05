const express = require("express");

const app = express();

const router = require("./routes");
app.use("/api", router);

app.get("/hello", (req, res) => {
    res.status(200).json({msg: "hello"});
});

const port = 5000
app.listen(port,  () => {
    console.log(`Server is listening on http://localhost:${port}`);
});