const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const { secret_dbUrl, secret_dbName} = require('../secret/secret')

const url = secret_dbUrl;
const client = new MongoClient(url, { useUnifiedTopology: true } );

const dbName = secret_dbName;

async function db_getDB() {
    try {
        if (!client.isConnected()) {
			await client.connect();
        console.log("Connected correctly to server");
		}
		db = client.db(dbName);
		return db;
    } catch (err) {
        console.log(err.stack);
		return false;
    }
}

module.exports.db_getDB = db_getDB;
