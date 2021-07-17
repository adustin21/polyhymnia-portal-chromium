import { ACTION_TYPES } from "../constants/types";
import JsFileDownloader from 'js-file-downloader';
import { DATA_PATH } from "../constants/data-path";

export const loadFileFromServer = (url) => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.CHANGE_DOWNLODING_DATA, payload: {wait: true}});
		new JsFileDownloader({
			url: DATA_PATH.serverURL + url
		  })
		  .then(function () {
		  })
		  .catch(function (error) {
			dispatch({type: ACTION_TYPES.CHANGE_DOWNLODING_DATA, payload: {isFileExist: false}});
		  });
		dispatch({type: ACTION_TYPES.CHANGE_DOWNLODING_DATA, payload: {wait: false}});
	}
}
