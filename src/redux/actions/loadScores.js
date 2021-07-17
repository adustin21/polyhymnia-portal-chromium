import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types"
import serverResponse from "../tools/server-response"
import { addHeadWarning } from "./addHeadWarning";
import { changeScoresData } from "./changeScoresData";

export const loadScores = (page = 0) => {
	return async dispatch => {
		dispatch(changeScoresData({nowLoad: true}));
		const scoresResult = await serverResponse("/scores/data/get", {page}, dispatch);
		switch (scoresResult.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.APPEND_SCORES, payload: {scores: scoresResult.body}});
				dispatch({type: ACTION_TYPES.SET_SCORES_DATA, payload: {isLoad: true, lastLoadPage: page}});
				break;
			default:
				dispatch(addHeadWarning("Произошла ошибка, попробуйте перезагрузить страницу"))
				break;
		}
		dispatch(changeScoresData({nowLoad: false, canLoadMore: scoresResult.body.length === 6}));
	}
}
