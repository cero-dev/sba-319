const express = require("express");

const router = express.Router();


// get /comics
router.get("/comics", (req, res) => {
    res.status(200).json({ msg: "GET REQUEST TO /api/todos" });
})
// post /comics
router.post("/comics", (req, res) => {
    res.status(200).json({ msg: "POST REQUEST TO /api/todos" });
})
// delete /comics/:id
router.delete("/comics:id", (req, res) => {
    res.status(200).json({ msg: "DELETE REQUEST TO /api/todos:id" });
})
//put /comics/:id
router.put("/comics:id", (req, res) => {
    res.status(200).json({ msg: "PUT REQUEST TO /api/todos:id" });
})

module.exports = router;