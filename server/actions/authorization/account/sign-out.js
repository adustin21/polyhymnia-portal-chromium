const { RC } = require("../../../constants/response_codes");
const { db_deleteOne } = require("../../../db/delete-one");
const { secret_dbCollections } = require("../../../secret/secret");
const { responsePattern } = require("../../response-pattern");
const { auth_che_checkAuth } = require("../check-auth/check-auth");
const ObjectId = require('mongodb').ObjectId;

async function auth_acc_signOut(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code !== RC.SUCCESS && user.code !== RC.ACCOUNT_NOT_VERIFIED) {
		return responsePattern(user.code, user.body);
	}
	const result = await db_deleteOne(secret_dbCollections.sessions, {'_id': ObjectId(data.cookies.session)});
	if (result.body.deletedCount) {
		return result;
	}
	return responsePattern(RC.FAILED_TO_CREATE_RECORD);
}

module.exports.auth_acc_signOut = auth_acc_signOut;
