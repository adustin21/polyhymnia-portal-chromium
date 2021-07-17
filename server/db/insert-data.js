const { db_getDB } = require("./get-DB");
const { RC } = require('../constants/response_codes')

async function db_insertData(collectionName, data){
	try {
		const db = await db_getDB();
		if (!db)
    		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: {}};
		const collection = await db.collection(collectionName);
		const resultID = await collection.insertOne(data)
		.then(res => {
			return res.insertedId;
		})
		return {code: RC.SUCCESS, body: {resultID}};
	} catch (error) {
		return {code: RC.FAILED_TO_CREATE_RECORD, body: {resultID: ''}};
	}
}

module.exports.db_insertData = db_insertData;
