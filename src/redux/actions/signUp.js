import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response"
import { addHeadWarning } from "./addHeadWarning";

export function signUp(login, password, mail, firstName, lastName, voice){
	return async dispatch => {
		dispatch({type: ACTION_TYPES.CHANGE_SIGN_UP_DATA, payload: {
			wait : true,
		}})
		const response = await serverResponse("/authorization/account/create", {
			login,
			password,
			mail,
			firstName,
			lastName,
			voice
		}, dispatch);
		switch (response.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.IS_VERIFIED});
				dispatch({type: ACTION_TYPES.IS_AUTH});
				break ;
			case RC.ACCOUNT_NOT_VERIFIED:
				dispatch({type: ACTION_TYPES.IS_AUTH});
				break ;
			case RC.THIS_ACCOUNT_ALREADY_EXISTS:
				dispatch(addHeadWarning('Аккаунт с таким логином уже существует'));
				break ;
			default:
				dispatch(addHeadWarning('Произошла ошибка, попробуйте снова'));
				break;
		}
		dispatch({type: ACTION_TYPES.CHANGE_SIGN_UP_DATA, payload: {
			wait : false,
			login: '',
			password: '',
			mail: '',
			firstName: '',
			lastName: '',
			voice: ''
		}})
	}
}
