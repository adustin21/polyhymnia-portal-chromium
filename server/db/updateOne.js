const { db_getDB } = require("./get-DB");
const { RC } = require('../constants/response_codes')

async function db_updateOne(collectionName, query, updateDoc, options = {}){
	try {
		const db = await db_getDB();
		if (!db)
    		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: {}};
		const collection = await db.collection(collectionName);
		const result = await collection.updateOne(query, updateDoc, options);
		return {code: RC.SUCCESS, body: result};
	} catch (error) {
		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: {}};
	}
}

module.exports.db_updateOne = db_updateOne;
