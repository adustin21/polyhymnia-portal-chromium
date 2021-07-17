const { RC } = require("../../../../constants/response_codes");
const { db_findOne } = require("../../../../db/find-one");
const { secret_dbCollections } = require("../../../../secret/secret");
const { PROJECT_SETTINGS } = require('../../../../setting');
const { auth_che_checkAuth } = require("../../../authorization/check-auth/check-auth");
const { responsePattern } = require("../../../response-pattern");
const fs = require('fs');

async function man_sco_dra_fils_delete (data, res){
	let user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code === RC.SUCCESS){
		if (user.body.accessLevel !== 'admin') {
			return responsePattern(RC.ACCESS_DENIED);
		}
		const resultDraft = await db_findOne(secret_dbCollections.scores, {draft: true, creator: user.body.login});
		if (resultDraft.code === RC.SUCCESS){
			if (resultDraft.body === null)
				return responsePattern(RC.SUCCESS)
			try {
				await fs.rmdirSync(PROJECT_SETTINGS.PATH + '/data-store/scores/' + resultDraft.body._id + '/', { recursive: true });
				return responsePattern(RC.SUCCESS)
			} catch (error) {
				if (error.errno === -2) {
					return responsePattern(RC.SUCCESS)
				}
				return responsePattern(RC.FAILED_TO_CREATE_RECORD);
			}
		}
		return responsePattern(resultDraft.code)
	}
	return responsePattern(user.code);
}

module.exports.man_sco_dra_fils_delete = man_sco_dra_fils_delete;
