import { DATA_PATH } from "../constants/data-path"
import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";

async function serverResponse(url, body, dispatch) {
	try {
		let response = await fetch(DATA_PATH.serverURL + url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				...body
			})
		})
		const json = await response.json();
		if (response.ok) {
			if ((json.code === RC.INCORRECT_USER_DATA ||
				json.code === RC.SESSION_DOES_NOT_EXIST) &&
				dispatch !== undefined) {
				dispatch({type: ACTION_TYPES.IS_NOT_AUTH});
			}
			return json;
		}else{
			return {code: RC.SERVER_IS_NOT_RESPONDING, body: {}}
		}
	} catch (error) {
		return {code: RC.UNKNOWN_ERROR, body: {}}
	}

}

export default serverResponse;































// let response = await fetch('https://localhost:3000' + element__request.value,{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				credentials: 'include',
// 				body: JSON.stringify({
// 					login: 'login',
// 					password: 'password',
// 					firstName: 'firstname',
// 					lastName: 'lastname',
// 					voice: 'soprano',
// 				}),
// 			});
// 			let json = await response.json();
