const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// Setting up low db:
const adapter = new FileSync('data/db.json');
const db = low(adapter);


const getRecord = (req, res) => {
   const dbGet = db.get("records")
    res.send(dbGet)
}

const postRecord = (req, res) => {
    db.get("records").push(req.body).write()
    res.send("working")
}

module.exports = {getRecord, postRecord}