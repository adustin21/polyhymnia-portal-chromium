import { ACTION_TYPES } from "../constants/types";

const initialState = {
	messages: []
}

export const headWarningReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.ADD_HEAD_WARNING:
			return {...state, messages: [...state.messages, {
				message: action.payload.message,
				type: action.payload.type
			}]}
		case ACTION_TYPES.CLEAR_HEAD_WARNING:
			return {...state, messages: state.messages.slice(1)}
		default:
			return state;
	}
}
