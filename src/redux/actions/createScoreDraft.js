import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response";
import { addHeadWarning } from "./addHeadWarning";

export const createScoreDraft = (title, composer, parts) => {

	return async dispatch => {
		dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: true}})
		const deleteFile = await serverResponse("/manage/score/draft/files/delete", {}, dispatch);
		if (deleteFile.code !== RC.SUCCESS) {
			dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: false}});
			dispatch(addHeadWarning('Произошла ошибка попробуйте снова 1'))
		}else{
			const result = await serverResponse("/manage/scores/draft/create", {title, composer, parts}, dispatch);
			switch (result.code) {
				case RC.SUCCESS:
					dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT,
						payload: {...result.body, isLoad: true, draftLoading: false, draftExist: result.body !== null}})
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
					dispatch(addHeadWarning('Произошла ошибка, обновите страницу'));
			dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: false}})
		}
		}


	}
}
