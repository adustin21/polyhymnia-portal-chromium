import { ACTION_TYPES, HEAD_WARNING_TYPES } from "../constants/types";
import { addHeadWarning } from "./addHeadWarning";
import { RC } from "../constants/response-codes"
import serverResponse from "../tools/server-response"

export const createAd= (title, text, needSend) => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.CHANGE_ADD_DATA, payload: {wait: true}});
		const result = await serverResponse("/ads/ad/create", {title, text, needSend}, dispatch);
		switch (result.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.CHANGE_ADD_DATA,
					payload: {title: '', text: '', needSend: false}});
				dispatch(addHeadWarning('Успешно', HEAD_WARNING_TYPES.SUCCES));
				break;
			case RC.ACCOUNT_NOT_VERIFIED:
				dispatch({type: ACTION_TYPES.IS_NOT_AUTH});
				dispatch(addHeadWarning('Доступ для этого пользователя запрещен'));
				break;
			case RC.ACCESS_DENIED:
				dispatch({type: ACTION_TYPES.IS_NOT_AUTH});
				dispatch(addHeadWarning('Доступ для этого пользователя запрещен'));
				break;
			default:
				dispatch(addHeadWarning('Произошла ошибка, попробуйте снова'));
		}
		dispatch({type: ACTION_TYPES.CHANGE_ADD_DATA, payload: {wait: false}})
	}
}
