import { ACTION_TYPES } from "../constants/types";

const initialState = {
	ads: [],
	isLoad: false,
}

export const adsDataReduser = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_ADS_DATA:
			return {...state, ...action.payload}
		default:
			return state;
	}
}
