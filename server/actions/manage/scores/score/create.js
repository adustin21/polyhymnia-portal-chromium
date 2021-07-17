const { RC } = require("../../../../constants/response_codes");
const { db_updateOne } = require("../../../../db/updateOne");
const { secret_dbCollections } = require("../../../../secret/secret");
const { auth_che_checkAuth } = require("../../../authorization/check-auth/check-auth");
const { responsePattern } = require("../../../response-pattern");

const checkBody = (data) => {
	if (data === undefined ||
		data.title === undefined ||
		data.composer === undefined ||
		data.parts === undefined ||
		data.parts.length === 0) {
			return false;
	}
	return true;
}

async function man_sco_sco_create (data, res){
	if (!checkBody(data.body))
		return (responsePattern(RC.INVALID_FORMAT))
	let user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code === RC.SUCCESS){
		if (user.body.accessLevel !== 'admin') {
			return responsePattern(RC.ACCESS_DENIED);
		}
		const draftResult = await db_updateOne(secret_dbCollections.scores, {draft: true, creator: user.body.login}, {
			$set:{
				...data.body,
				draft: false,
			}
		})
		return responsePattern(draftResult.code);
	}
	return responsePattern(user.code);
}

module.exports.man_sco_sco_create = man_sco_sco_create;
