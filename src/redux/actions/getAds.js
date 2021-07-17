import { RC } from "../constants/response-codes";
import { ACTION_TYPES } from "../constants/types";
import serverResponse from "../tools/server-response";
import {addHeadWarning} from "./addHeadWarning"

export const getAds = () => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.SET_ADS_DATA, payload: {isLoad : false}})
		const result = await serverResponse("/ads/get", {}, dispatch);
		switch (result.code) {
			case RC.SUCCESS:
				dispatch({type: ACTION_TYPES.SET_ADS_DATA, payload: {ads : result.body}});
				break;
			default:
				dispatch(addHeadWarning('Произошла ошибка, попробуйте обновить страницу'));
				break;
		}
		dispatch({type: ACTION_TYPES.SET_ADS_DATA, payload: {isLoad : true}})
	}
}
