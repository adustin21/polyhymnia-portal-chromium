import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response";
import { addHeadWarning } from "./addHeadWarning";

export const verifyUser = (login) => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.SET_VERIFICATION_REQUESTS,
			payload: {canClick: false}})
		const result = await serverResponse("/manage/requests/verify", {login}, dispatch);
		switch (result.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.SET_VERIFICATION_REQUESTS,
					payload: {requests: result.body, isLoad: true}})
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
				dispatch(addHeadWarning('Произошла ошибка, попробуйте снова или обновите страницу'));
		}
		dispatch({type: ACTION_TYPES.SET_VERIFICATION_REQUESTS,
			payload: {canClick: true}})

	}
}
