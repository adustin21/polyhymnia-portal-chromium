import { ACTION_TYPES } from "../constants/types";

const initialState = {
	wait: false,
	isFileExist: true
}

export const downloadFileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_DOWNLODING_DATA:
			return {...state, ...action.payload}
		default:
			return state;
	}
}
