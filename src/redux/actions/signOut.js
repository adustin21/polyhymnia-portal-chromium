import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response"
import { addHeadWarning } from "./addHeadWarning";

export function signOut(){
	return async dispatch => {
		dispatch({type: ACTION_TYPES.SET_USER_DATA, payload: {wait: true}});
		const response = await serverResponse("/authorization/account/sign-out", {}, dispatch);
		switch (response.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.IS_NOT_AUTH});
				dispatch({type: ACTION_TYPES.IS_NOT_VERIFIED});
				break ;
			case RC.ACCOUNT_NOT_VERIFIED:
				dispatch({type: ACTION_TYPES.IS_NOT_AUTH});
				dispatch({type: ACTION_TYPES.IS_NOT_VERIFIED});
				break ;
			default:
				dispatch(addHeadWarning('Произошла ошибка, попробуйте снова'));
				break;
		}
		dispatch({type: ACTION_TYPES.SET_USER_DATA, payload: {
			wait: false,
		}});
	}
}
