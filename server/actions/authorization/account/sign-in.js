const { responsePattern } = require("../../response-pattern")
const { RC } = require('../../../constants/response_codes');
const { db_insertData } = require("../../../db/insert-data");
const { secret_dbCollections } = require("../../../secret/secret");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { db_findOne } = require("../../../db/find-one");
const { db_deleteOne } = require("../../../db/delete-one");

const checkBody = (body) => {
	if (body === undefined ||
		body.login === undefined ||
		body.password === undefined
	){
		return false;
	}else{
		return true;
	}
}

async function auth_acc_signIn(data, res, accessLevel = 'user'){
	const body = data.body;
	if (checkBody(body)) {
		const user = await db_findOne(secret_dbCollections.users, {'login': body.login});
		if (user.code !== RC.SUCCESS)
			return responsePattern(user.code);
		if (user.body === null)
			return responsePattern(RC.INCORRECT_USER_DATA);
		let result = bcrypt.compareSync( body.password, user.body.password);
		if(!result)
			return responsePattern(RC.INCORRECT_USER_DATA);
		db_deleteOne(secret_dbCollections.sessions, {'userID': user.body._id});
		result = await db_insertData(secret_dbCollections.sessions, {
			jsw: user.body.jsw,
			userID: user.body._id,
			timestamp: Date.now(),
		});
		if (result.code !== RC.SUCCESS)
			return responsePattern(result.code)
		res.cookie('session', result.body.resultID, {
			secure: true,
			sameSite: 'none',
			maxAge: 1000 * 60 * 60,
		})
		res.cookie('uuid', user.body.uuid, {
			secure: true,
			sameSite: 'none',
			maxAge: 1000 * 60 * 60,
		})
		return responsePattern(user.body.verification ? RC.SUCCESS : RC.ACCOUNT_NOT_VERIFIED);
	}else{
		return responsePattern(RC.INVALID_FORMAT);
	}
}

module.exports.auth_acc_signIn = auth_acc_signIn;
