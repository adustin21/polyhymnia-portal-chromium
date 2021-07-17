const { RC } = require('../../../constants/response_codes');
const { db_findOne } = require("../../../db/find-one");
const { secret_dbCollections } = require("../../../secret/secret");
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const { responsePattern } = require("../../response-pattern");

async function auth_che_checkAuth(data, res){
	try {
		if (data.session === undefined || data.uuid === undefined) {
			return responsePattern(RC.SESSION_DOES_NOT_EXIST);
		}
		const session = await db_findOne(secret_dbCollections.sessions, {_id: ObjectId(data.session)});
		// добавить обновление timestamp
		if (session.code !== RC.SUCCESS)
			return responsePattern(session.code);
		if (session.body === null)
			return responsePattern(RC.SESSION_DOES_NOT_EXIST);
		const user = await db_findOne(secret_dbCollections.users, {_id: ObjectId(session.body.userID)});
		if (user.code !== RC.SUCCESS)
			return responsePattern(user.code);
		if (user.body === null)
			return responsePattern(RC.INCORRECT_USER_DATA);
		if (bcrypt.compareSync(user.body.secret + data.uuid, session.body.jsw)){
			res.cookie('session', data.session, {
				secure: true,
				sameSite: 'none',
				maxAge: 1000 * 60 * 60,
			})
			res.cookie('uuid', data.uuid, {
				secure: true,
				sameSite: 'none',
				maxAge: 1000 * 60 * 60,
			})
			if (!user.body.verification)
				user.code = RC.ACCOUNT_NOT_VERIFIED;
			return user;
		}else{
			return responsePattern(RC.INCORRECT_USER_DATA)
		}
	} catch (error) {
		return {code: RC.UNKNOWN_ERROR, body: {resultID: ''}};
	}
}

module.exports.auth_che_checkAuth = auth_che_checkAuth;
