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
    let { series, issue, format, hasRead } = req.body;
  
    if (!series || !issue || !format || typeof hasRead !== "boolean") {
      return res.status(400).json({ msg: "Error: Missing or invalid data" });
    }
  
    const newComic = await collection.insertOne({ series, issue, format, hasRead });
  
    res.status(200).json({ series, issue, format, hasRead, _id: newComic.insertedId });
  });
// delete /comics/:id
router.delete("/comics/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    
    const deletedComic = await collection.deleteOne({ _id });
    res.status(200).json(deletedComic);
})
//put /comics/:id
router.patch("/comics/:id", async (req, res) => {
    console.log("PATCH request received");
  
    try {
      console.log("Before updateOne operation");
  
      const collection = getCollection();
  
      const _id = new ObjectId(req.params.id);
      const { hasRead } = req.body;
  
      const result = await collection.findOneAndUpdate(
        { _id },
        { $set: { hasRead } },
        { returnDocument: 'after' } // Return the updated document
      );
  
      console.log("After updateOne operation");
      console.log(result);
      if (result._id) {
        // Successful update
        res.status(200).json(result.hasRead);

      }
    } catch (error) {
      console.error("Error updating comic:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });

module.exports = router;