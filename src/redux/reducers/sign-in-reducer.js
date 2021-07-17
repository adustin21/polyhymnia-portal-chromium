import { ACTION_TYPES } from "../constants/types";

const initialState = {
	login: '',
	password: '',
	wait: false,
}

export const signInReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_SIGN_IN_DATA:
			return {...state, ...action.payload}
		default:
			return state;
	}
}
