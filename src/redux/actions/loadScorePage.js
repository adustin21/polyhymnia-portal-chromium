import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types"
import serverResponse from "../tools/server-response"
import { addHeadWarning } from "./addHeadWarning";
import { changeScoresData } from "./changeScoresData";

export const loadScorePage = (id) => {
	return async dispatch => {
		dispatch(changeScoresData({nowScore: {id: '', nowLoad: true}}));
		const scoreResult = await serverResponse("/scores/score/get", {id}, dispatch);
		switch (scoreResult.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.SET_SCORES_DATA, payload: {nowScore: {...scoreResult.body, nowLoad: false}}});
				break;
			case RC.INVALID_FORMAT:
				dispatch(addHeadWarning("Страница не найдена"));
				break ;
			default:
				dispatch(addHeadWarning("Произошла ошибка, попробуйте перезагрузить страницу"))
				break;
		}
	}
}
