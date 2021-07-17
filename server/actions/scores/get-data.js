const { RC } = require("../../constants/response_codes");
const { db_find } = require("../../db/find");
const { db_findLimit } = require("../../db/find-limit");
const { secret_dbCollections } = require("../../secret/secret");
const { auth_che_checkAuth } = require("../authorization/check-auth/check-auth");
const { responsePattern } = require("../response-pattern");

async function sco_getData(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res)
	if (user.code === RC.SUCCESS){
		const step = 6;
		const page = data.body.page * step;
		const scoresResult = await db_findLimit(secret_dbCollections.scores, {draft: false}, {}, page, page + step);
		if (scoresResult.code === RC.SUCCESS) {
			const resultData = scoresResult.body.map(element => {
				return {
					id: element._id,
					title: element.title,
					composer: element.composer,
					parts: element.parts,
				}
			})
			return responsePattern(scoresResult.code, resultData);
		}
		return responsePattern(scoresResult.code)

	}
	return responsePattern(user.code);
}
module.exports.sco_getData= sco_getData;
