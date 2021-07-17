import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response"
import { addHeadWarning } from "./addHeadWarning";

export function signIn(login, password){
	return async dispatch => {
		dispatch({type: ACTION_TYPES.CHANGE_SIGN_IN_DATA, payload: {
			wait : true,
		}})
		const response = await serverResponse("/authorization/account/sign-in", {login, password}, dispatch);
		switch (response.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.IS_VERIFIED});
				dispatch({type: ACTION_TYPES.IS_AUTH});
				break ;
			case RC.ACCOUNT_NOT_VERIFIED:
				dispatch({type: ACTION_TYPES.IS_AUTH});
				break ;
			case RC.INCORRECT_USER_DATA:
				dispatch(addHeadWarning('Неправильный логин или пароль'));
				break ;
			default:
				dispatch(addHeadWarning('Произошла ошибка, попробуйте снова'));
				break;
		}
		dispatch({type: ACTION_TYPES.CHANGE_SIGN_IN_DATA, payload: {
			wait : false,
			login: '',
			password: ''
		}})
	}
}
