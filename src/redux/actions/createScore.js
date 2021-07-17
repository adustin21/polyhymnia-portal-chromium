import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response";
import { addHeadWarning } from "./addHeadWarning";

export const createScore = (title, composer, parts) => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: true}});
		const check = await parts.filter(part => {
			return (part.name === 'error' ||
			part.pdf.__proto__.toString() === "[object File]" ||
			part.mp3.__proto__.toString() === "[object File]" ||
			part.midi.__proto__.toString() === "[object File]")
		});
		if (check.length !== 0) {
			dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: true}});
			dispatch(addHeadWarning('Произошла ошибка попробуйте снова'))
		}else{
			const result = await serverResponse("/manage/scores/score/create", {title, composer, parts}, dispatch);
			switch (result.code) {
				case RC.SUCCESS:
					dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT,
						payload: {...result.body, isLoad: true, draftLoading: false, draftExist: false}})
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
					dispatch(addHeadWarning('Произошла ошибка, попробуйте снова 2'));
			}
		}
		dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: false}})
	}
}
