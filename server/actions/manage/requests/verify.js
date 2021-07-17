const { responsePattern } = require("../../response-pattern");
const { auth_che_checkAuth } = require("../../authorization/check-auth/check-auth");
const { RC } = require("../../../constants/response_codes");
const { secret_dbCollections } = require("../../../secret/secret");
const { db_updateOne } = require("../../../db/updateOne");
const { db_find } = require("../../../db/find");

async function man_req_verify (data, res){
	let user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code === RC.SUCCESS){
		if (user.body.accessLevel !== 'admin') {
			return responsePattern(RC.ACCESS_DENIED);
		}
		let updateResult = await db_updateOne(
			secret_dbCollections.users,
			{login: data.body.login},
			{
				$set: {
					verification: true
				}
			}
			);
		if (updateResult.code === RC.SUCCESS){
			const ver_requests = await db_find(secret_dbCollections.users, {'verification': false});
			const ver_requestsData = ver_requests.body.map(element => {
				return{
					login: element.login,
					firstName: element.firstName,
					lastName: element.lastName,
					accessLevel: element.accessLevel,
				}
			})
			return responsePattern(ver_requests.code, ver_requestsData);
		}
		return responsePattern(updateResult.code);
	}
	return responsePattern(user.code);
}

module.exports.man_req_verify = man_req_verify;
