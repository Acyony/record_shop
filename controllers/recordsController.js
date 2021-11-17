const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// Setting up low db:
const adapter = new FileSync('data/db.json');
const db = low(adapter);


const getRecord = (req, res) => {
    const dbGet = db.get("records")
    res.send(dbGet)
}

const postRecord = (req, res, next) => {
    const record = req.body;
    db.get("records")
        .push(record)
        .last()
        .assign({id: Date.now().toString()})
        .write();

    res.status(200).send(record);
}

module.exports = {getRecord, postRecord}


