import { ACTION_TYPES } from "../constants/types";

const initialState = {
	isLoad: false,
	nowPage: 0,
	lastLoadPage: -1,
	canLoadMore: true,
	nowLoad: false,
	scores: [],
	nowScore: {
		nowLoad: false,
		id: '',
		title: '',
		composer: '',
		parts: [],

	}
}

export const scoresDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case (ACTION_TYPES.SET_SCORES_DATA):
			return {...state, ...action.payload}
		case (ACTION_TYPES.APPEND_SCORES):
			return {...state, scores: [...state.scores, ...action.payload.scores]}
		default:
			return state;
	}
}
