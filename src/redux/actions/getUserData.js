import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response";

export const getUserData = () => {
	return async dispatch => {
		const result = await serverResponse("/user/data/get", {}, dispatch);
		switch (result.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.IS_VERIFIED});
				dispatch({type: ACTION_TYPES.SET_USER_DATA, payload: result.body})
				break;
			case RC.ACCOUNT_NOT_VERIFIED:
				dispatch({type: ACTION_TYPES.SET_USER_DATA, payload: result.body})
				break;
			default:
				dispatch({type: ACTION_TYPES.IS_NOT_AUTH});
		}
		dispatch({type: ACTION_TYPES.IS_FIRST_DATA_LOAD})
	}
}
