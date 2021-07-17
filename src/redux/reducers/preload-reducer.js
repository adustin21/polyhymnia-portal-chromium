import { ACTION_TYPES } from "../constants/types";

const initialState = {
	isAuth: true,
	isVerified: false,
	isFirstDataLoad: false,
	deviceType: window.matchMedia("only screen and (max-width: 760px)").matches ?
				'mobile':
				'desctop',
}

export const preloadReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.IS_AUTH:
			return {...state, isAuth: true}
		case ACTION_TYPES.IS_NOT_AUTH:
			return {...state, isAuth: false}
		case ACTION_TYPES.IS_VERIFIED:
			return {...state, isVerified: true}
		case ACTION_TYPES.IS_NOT_VERIFIED:
			return {...state, isVerified: false}
		case ACTION_TYPES.IS_FIRST_DATA_LOAD:
			return {...state, isFirstDataLoad: true}
		case ACTION_TYPES.IS_NOT_FIRST_DATA_LOAD:
			return {...state, isFirstDataLoad: false}
		default:
			return state;
	}
}
