const { RC } = require("../../constants/response_codes");
const { db_find } = require("../../db/find");
const { secret_dbCollections } = require("../../secret/secret");
const { auth_che_checkAuth } = require("../authorization/check-auth/check-auth");
const { responsePattern } = require("../response-pattern");

async function ads_getAds(data, res){
	const user = await auth_che_checkAuth({...data.cookies}, res)
	if (user.code === RC.SUCCESS){
		try {
			const adsResult = await db_find(secret_dbCollections.adds, {}, {});
			if (adsResult.code === RC.SUCCESS) {
				return responsePattern(adsResult.code, adsResult.body);
			}
			return responsePattern(adsResult.code)
		} catch (error) {
			return responsePattern(RC.INVALID_FORMAT);
		}
	}
	return responsePattern(user.code);
}
module.exports.ads_getAds = ads_getAds;
