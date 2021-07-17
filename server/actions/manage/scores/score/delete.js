const { RC } = require("../../../../constants/response_codes");
const { secret_dbCollections } = require("../../../../secret/secret");
const { auth_che_checkAuth } = require("../../../authorization/check-auth/check-auth");
const { responsePattern } = require("../../../response-pattern");
const { db_deleteOne } = require('../../../../db/delete-one');
const ObjectID = require('mongodb').ObjectId;

async function sco_delete(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res)
	if (data.body === undefined || data.body.id === undefined)
		return responsePattern(RC.INVALID_FORMAT, {a:1});
	if (user.code === RC.SUCCESS){
		try {
			const o_id = ObjectID(data.body.id);
			const deletedResult = await db_deleteOne(secret_dbCollections.scores, {_id: o_id});
			if (deletedResult.code === RC.SUCCESS) {
				if (deletedResult.body.deletedCount !== 1) {
					return responsePattern(RC.FAILED_TO_CREATE_RECORD);
				}
				return responsePattern(deletedResult.code);
			}
			return responsePattern(deletedResult.code)
		} catch (error) {
			return responsePattern(RC.INVALID_FORMAT, {a:2});
		}
	}
	return responsePattern(user.code);
}
module.exports.sco_delete = sco_delete;
