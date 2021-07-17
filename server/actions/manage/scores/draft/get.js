const { RC } = require("../../../../constants/response_codes");
const { db_findOne } = require("../../../../db/find-one");
const { secret_dbCollections } = require("../../../../secret/secret");
const { auth_che_checkAuth } = require("../../../authorization/check-auth/check-auth");
const { responsePattern } = require("../../../response-pattern");

async function man_sco_dra_get (data, res){
	let user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code === RC.SUCCESS){
		if (user.body.accessLevel !== 'admin') {
			return responsePattern(RC.ACCESS_DENIED);
		}
		const resultDraft = await db_findOne(secret_dbCollections.scores, {draft: true, creator: user.body.login});
		return responsePattern(resultDraft.code, resultDraft.body !== null ? {
			composer: resultDraft.body.composer,
			parts: resultDraft.body.parts,
			title: resultDraft.body.title
		} : null)
	}
	return responsePattern(user.code);
}

module.exports.man_sco_dra_get = man_sco_dra_get;
