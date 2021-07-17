import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import FileUpload from "../tools/file-upload";
import { addHeadWarning } from "./addHeadWarning";
import { changeScoreDraftData } from "./changeScoreDraftData";

export const loadScoreDraftFile = (part, file, parts, index, fileType) => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: true}});
		const sendData = new FormData();
		const newParts = [...parts];
		sendData.append('file', file)
		sendData.append('part', part);
		const result = await FileUpload("/manage/scores/file/load", sendData, dispatch);

		switch (result.code) {
			case RC.SUCCESS:
				newParts[index][fileType] = result.body.path;
				dispatch(changeScoreDraftData({parts: newParts}));
				dispatch({type: ACTION_TYPES.SET_SCORE_DRAFT, payload: {draftLoading: false}});
				break;
			default:
				newParts[index][fileType] = {name: 'Ошибка'};
				dispatch(addHeadWarning('Произошла ошибка попробуйте снова 2'))
		}
	}
}
