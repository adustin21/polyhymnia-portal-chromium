const { db_getDB } = require("./get-DB");
const { RC } = require('../constants/response_codes')

async function db_findOne(collectionName, query, options = {}){
	try {
		const db = await db_getDB();
		if (!db)
    		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: {}};
		const collection = await db.collection(collectionName);
		const result = await collection.findOne(query, options);
		return {code: RC.SUCCESS, body: result};
	} catch (error) {
		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: {}};
	}
}

module.exports.db_findOne = db_findOne;
