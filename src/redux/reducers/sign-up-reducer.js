import { ACTION_TYPES } from "../constants/types";

const initialState = {
	login: '',
	password: '',
	w_password: '',
	mail: '',
	firstName: '',
	lastName: '',
	voice: '',
	wait: false,
}

export const signUpReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_SIGN_UP_DATA:
			return {...state, ...action.payload}
		default:
			return state;
	}
}
