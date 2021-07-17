const { RC } = require("../../constants/response_codes");
const { auth_che_checkAuth } = require("../authorization/check-auth/check-auth");
const { responsePattern } = require("../response-pattern");

async function us_getData(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res)
	if (user.code === RC.SUCCESS || user.code === RC.ACCOUNT_NOT_VERIFIED){
		const userData = {
			login: user.body.login,
			firstName: user.body.firstName,
			lastName: user.body.lastName,
			voice: user.body.voice,
			avatar: user.body.avatar,
		}
		return responsePattern(user.code, userData);
	}
	return responsePattern(user.code);
}
module.exports.us_getData= us_getData;
