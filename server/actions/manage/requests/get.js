const { responsePattern } = require("../../response-pattern");
const { auth_che_checkAuth } = require("../../authorization/check-auth/check-auth");
const { RC } = require("../../../constants/response_codes");
const { db_find } = require("../../../db/find");
const { secret_dbCollections } = require("../../../secret/secret");

async function man_req_modify (data, res){
	let user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code === RC.SUCCESS){
		if (user.body.accessLevel !== 'admin') {
			return responsePattern(RC.ACCESS_DENIED);
		}
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
	return responsePattern(user.code);
}

module.exports.man_req_modify = man_req_modify;
