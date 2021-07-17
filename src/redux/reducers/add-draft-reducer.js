import { ACTION_TYPES } from "../constants/types";

const initialState = {
	title: '',
	text: '',
	needSend: false,
	wait: false,
}

export const addDraftReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_ADD_DATA:
			return {...state,...action.payload}
		default:
			return state
	}
}
