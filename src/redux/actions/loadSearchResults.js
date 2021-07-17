import { RC } from "../constants/response-codes";
import serverResponse from "../tools/server-response"
import { changeSearchData } from "./changeSearchData";

export const loadSearchResult = (title) => {
	return async dispatch => {
		dispatch(changeSearchData({nowLoading: true}));
		const scoresResult = await serverResponse("/scores/data/search", {title}, dispatch);
		switch (scoresResult.code) {
			case RC.SUCCESS:
				dispatch(changeSearchData({scores: scoresResult.body}));
				break;
			default:
				break;
		}
		dispatch(changeSearchData({nowLoading: false}));
	}
}
