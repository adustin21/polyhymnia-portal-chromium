import { ACTION_TYPES } from "../constants/types";

const initialState = {
	isLoad: false,
	canClick: true,
	requests: []
}

export const VerificationRequestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case (ACTION_TYPES.SET_VERIFICATION_REQUESTS):
			return {...state, ...action.payload}
		default:
			return state;
	}
}
