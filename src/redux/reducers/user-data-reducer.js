import { ACTION_TYPES } from "../constants/types";

const initialState = {
	isDataLoad: false,
	login: '',
	firstName: '',
	lastName: '',
	voice: '',
	avatar: '',
	wait: false,
}

export const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_USER_DATA:
			return {...state, ...action.payload};
		default:
			return state;
	}
}
