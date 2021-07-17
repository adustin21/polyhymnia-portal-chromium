const { RC } = require("../../constants/response_codes");
const { db_findOne } = require("../../db/find-one");
const { secret_dbCollections } = require("../../secret/secret");
const { auth_che_checkAuth } = require("../authorization/check-auth/check-auth");
const { responsePattern } = require("../response-pattern");
const ObjectID = require('mongodb').ObjectID;

async function sco_getScore(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res)
	if (data.body === undefined || data.body.id === undefined)
		return responsePattern(RC.INVALID_FORMAT);
	if (user.code === RC.SUCCESS){
		try {
			const o_id = ObjectID(data.body.id);
			const scoresResult = await db_findOne(secret_dbCollections.scores, {_id: o_id, draft: false}, {});
			if (scoresResult.code === RC.SUCCESS) {
				const resultData = {
					id: scoresResult.body._id,
					title: scoresResult.body.title,
					composer: scoresResult.body.composer,
					parts: scoresResult.body.parts,

				}
				return responsePattern(scoresResult.code, resultData);
			}
			return responsePattern(scoresResult.code)
		} catch (error) {
			return responsePattern(RC.INVALID_FORMAT);
		}
	}
	return responsePattern(user.code);
}
module.exports.sco_getScore = sco_getScore;
