const { db_getDB } = require("./get-DB");
const { RC } = require('../constants/response_codes')

async function db_findLimit(collectionName, query, options = {}, skip, limit){
	try {
		const db = await db_getDB();
		if (!db)
    		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: {}};
		const collection = await db.collection(collectionName);
		const result = await collection.find(query, options).skip(skip).limit(limit).toArray();
		return {code: RC.SUCCESS, body: result};
	} catch (error) {
		return {code: RC.DATABASE_IS_NOT_AVAILABLE, body: []};
	}
}

module.exports.db_findLimit = db_findLimit;
