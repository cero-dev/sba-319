const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb"); 

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("comicbookcollectionsdb").collection("comics");
    return collection;
}

// get /comics
router.get("/comics", async (req, res) => {
    const collection = getCollection();
    const comics = await collection.find({}).toArray();


    res.status(200).json(comics);
})
// post /comics
router.post("/comics", async (req, res) => {
    const collection = getCollection();
    const {series, issue, format, hasRead} = req.body;
    const newComic = await collection.insertOne({series, issue, format, hasRead});

    if(!series){
        return res.status(400).json({msg: "Error: Missing Data"})
    }else if(!issue){
        return res.status(400).json({msg: "Error: Missing Data"})
    }else if(!format){
        return res.status(400).json({msg: "Error: Missing Data"})
    }else if(!hasRead){
        return res.status(400).json({msg: "Error: Missing Data"})
    }

    if(typeof hasRead !== "boolean"){
        return res.status(400).json({msg: "invalid status"});
    }

    res.status(200).json({series, issue, format, hasRead, _id: newComic.insertedId });
})
// delete /comics/:id
router.delete("/comics/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    
    const deletedComic = await collection.deleteOne({ _id });
    res.status(200).json(deletedComic);
})
//put /comics/:id
router.put("/comics/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const {series, issue, format, hasRead} = req.body

    if(!series){
        return res.status(400).json({msg: "Error: Missing Data"})
    }else if(!issue){
        return res.status(400).json({msg: "Error: Missing Data"})
    }else if(!format){
        return res.status(400).json({msg: "Error: Missing Data"})
    }else if(!hasRead){
        return res.status(400).json({msg: "Error: Missing Data"})
    }

    if(typeof hasRead !== "boolean"){
        return res.status(400).json({msg: "invalid status"});
    }

    const updatedComic = await collection.updateOne({_id}, {$set: {series, issue, format, hasRead}})

    res.status(200).json(updatedComic);
})

module.exports = router;