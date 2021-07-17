import { ACTION_TYPES } from "../constants/types";

const initialState = {
	isLoad: false,
	draftLoading: false,
	fileLoading: false,
	draftExist: false,
	_id: '',
	title: '',
	composer: '',
	parts: [],
}

export const createScoreReducer = (state = initialState, action) => {
	switch (action.type) {
		case (ACTION_TYPES.SET_SCORE_DRAFT):
			return {...state, ...action.payload}
		default:
			return state;
	}
}
