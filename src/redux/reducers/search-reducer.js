import { ACTION_TYPES } from "../constants/types";

const initialState = {
	nowLoading: false,
	inputData: '',
	canShowResults: 'false',
	scores: [],
}

export const searchDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case (ACTION_TYPES.SET_SEARCH_DATA):
			return {...state, ...action.payload}
		default:
			return state;
	}
}
