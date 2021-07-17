const { responsePattern } = require("../../response-pattern")
const { RC } = require('../../../constants/response_codes');
const { db_insertData } = require("../../../db/insert-data");
const { secret_dbCollections } = require("../../../secret/secret");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { db_findOne } = require("../../../db/find-one");

const checkBody = (body) => {
	if (body === undefined ||
		body.login === undefined ||
		body.password === undefined ||
		body.voice === undefined
	){
		return false;
	}else{
		return true;
	}
}

async function auth_acc_create(data, res, accessLevel = 'user'){
	const body = data.body;
	if (checkBody(body)) {
		const isLoginNotAvailible = await db_findOne(
			secret_dbCollections.users,
			{login: body.login}
		);
		if(isLoginNotAvailible.body)
			return responsePattern(RC.THIS_ACCOUNT_ALREADY_EXISTS);
		const saltRounds = 10;
		const passwordHash = bcrypt.hashSync(body.password, saltRounds);
		let resultData = {
			accessLevel,
			...body,
			password: passwordHash,
			secret: uuidv4(),
			uuid: uuidv4(),
			jsw: '',
			userImage: '',
			verification: false,
			avatar: /[sa]/.test(body.voice) ? '/avatars/avatarka.png' : '/avatars/avatar.png',
		};
		resultData.jsw = bcrypt.hashSync(resultData.secret + resultData.uuid, saltRounds);
		let result = await db_insertData(secret_dbCollections.users, resultData);
		if (result.code !== RC.SUCCESS){
			return responsePattern(result.code)
		}
		result = await db_insertData(secret_dbCollections.sessions, {
			jsw: resultData.jsw,
			userID: result.body.resultID,
			timestamp: Date.now(),
		});
		if (result.code !== RC.SUCCESS){
			return responsePattern(result.code)
		}
		res.cookie('session', result.body.resultID, {
			secure: true,
			sameSite: 'none',
			maxAge: 1000 * 60 * 60,
		})
		res.cookie('uuid', resultData.uuid, {
			secure: true,
			sameSite: 'none',
			maxAge: 1000 * 60 * 60,
		})
		return responsePattern(RC.ACCOUNT_NOT_VERIFIED);
	}else{
		return responsePattern(RC.INVALID_FORMAT);
	}
}

module.exports.auth_acc_create = auth_acc_create;
