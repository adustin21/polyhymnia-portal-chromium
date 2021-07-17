const { RC } = require("../../../constants/response_codes");
const { secret_dbCollections } = require("../../../secret/secret");
const { auth_che_checkAuth } = require("../../authorization/check-auth/check-auth");
const { responsePattern } = require("../../response-pattern");
const {db_insertData} = require("../../../db/insert-data");

const checkBody = (data) => {
	if (data === undefined ||
		data.title === undefined ||
		data.text === undefined ||
		data.needSend === undefined) {
			return false;
	}
	return true;
}

async function man_add_create (data, res){
	if (!checkBody(data.body))
		return (responsePattern(RC.INVALID_FORMAT))
	try {
		let user = await auth_che_checkAuth({...data.cookies}, res);
		if (user.code === RC.SUCCESS){
			if (user.body.accessLevel !== 'admin') {
				return responsePattern(RC.ACCESS_DENIED);
			}
			const now = new Date();
			const creatingDate = [
				now.getDate(),
				now.getMonth(),
				now.getFullYear()
			].toString().replace(/,/g,'.');
			const addResult = await db_insertData(secret_dbCollections.adds, {...data.body, creatingDate})
			return responsePattern(addResult.code);
		}
		return responsePattern(user.code);
	} catch (error) {
		return (responsePattern(RC.UNKNOWN_ERROR))
	}
}

module.exports.man_add_create = man_add_create;
