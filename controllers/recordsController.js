const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// Setting up low db:
const adapter = new FileSync('data/db.json');
const db = low(adapter);


const getRecords = (req, res) => {
    const records = db.get("records")
    res.send(records)
}

const postRecord = async (req, res, next) => {
    const record = req.body;
    await db.get("records")
        .push(record)
        .last()
        .assign({id: Date.now().toString()})
        .write();

    res.status(200).send(record);
}


/*task 03*/
// get by id
const getRecordId = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    if (Number.isNaN(id)) {
        throw new Error("error: Uh oh, something has gone wrong. Please tweet us @racyony about the issue. Thank you."
        );
    }
    const record = await db.get("records").find({id}).value();
    res.send(record)
}

//update
const upDateRecord = async (req, res) => {
    const {id} = req.params;
    console.log(id)

    let record = await db.get('records').find({id}).value();
    const firstName = req.body.firstName || record.name.first;
    const lastName = req.body.lastName || record.name.last;
    const gender = req.body.gender || record.gender;
    console.log(req.body.lastName)

    record = await db.get('records').find({id}).assign(
        {
            gender: gender,
            name: {
                first: firstName,
                last: lastName
            }
        },
    ).write();
    // console.log(record)
    res.send(record)
}


// delete using id
const deleteRecord = async (req, res) => {
    const {id} = req.params;
    await db.get('records')
        .remove({id: id})
        .write()

    const records = db.get("records")
    res.send(records)
    console.log(`${id} deleted`)
}


module.exports = {getRecords, postRecord, getRecordId, deleteRecord, upDateRecord}


