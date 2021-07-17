const { RC } = require("../../../../constants/response_codes");
const { db_findOne } = require("../../../../db/find-one");
const { secret_dbCollections } = require("../../../../secret/secret");
const { PROJECT_SETTINGS } = require('../../../../setting');
const { auth_che_checkAuth } = require("../../../authorization/check-auth/check-auth");
const { responsePattern } = require("../../../response-pattern");
const fs = require('fs');
const path = require('path');

async function man_sco_dra_fil_upload (data, res){
	let user = await auth_che_checkAuth({...data.cookies}, res);
	if (user.code === RC.SUCCESS){
		if (user.body.accessLevel !== 'admin') {
			return responsePattern(RC.ACCESS_DENIED);
		}
		const resultDraft = await db_findOne(secret_dbCollections.scores, {draft: true, creator: user.body.login});
		if (resultDraft.code === RC.SUCCESS){
			const filetipe = data.files.file.name.match(/\..+$/);
			const dirPath = PROJECT_SETTINGS.PATH + '/data-store/scores/' + resultDraft.body._id + '/';
			try {
				await fs.statSync(dirPath)
			} catch (error) {
				if (error.errno === -2) {
					try {
						await fs.mkdirSync(dirPath);
					} catch (error) {
						return responsePattern(RC.FAILED_TO_CREATE_RECORD)
					}
				}else{
					return responsePattern(RC.FAILED_TO_CREATE_RECORD)
				}
			}
			try {
				await data.files.file.mv(dirPath + data.body.part + filetipe)
				return (responsePattern(RC.SUCCESS, {path: `/${resultDraft.body._id}/${data.body.part + filetipe}`}))
			} catch (error) {
				return responsePattern(RC.FAILED_TO_CREATE_RECORD)
			}
		}
		return responsePattern(resultDraft.code)
	}
	return responsePattern(user.code);
}

module.exports.man_sco_dra_fil_upload = man_sco_dra_fil_upload;
