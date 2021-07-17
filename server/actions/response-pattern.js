const {RC} = require('../constants/response_codes')

const responsePattern = (code = RC.UNKNOWN_RESULT, body = {}) => {
	let response = {
		code,
		body
	}
	return response;
}

module.exports.responsePattern = responsePattern;
