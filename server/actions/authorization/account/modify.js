const { responsePattern } = require("../../response-pattern");
const { auth_che_checkAuth } = require("../check-auth/check-auth");

async function auth_acc_modify (data, res){
	let result = await auth_che_checkAuth({...data.cookies}, res)
	return responsePattern(result.code, result.body);
}

module.exports.auth_acc_modify = auth_acc_modify;
