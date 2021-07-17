import { ACTION_TYPES, HEAD_WARNING_TYPES } from "../constants/types"

export const addHeadWarning = (message = 'Неизвестная ошибка', type = HEAD_WARNING_TYPES.ERROR) => {
	return async dispatch => {
		dispatch({type: ACTION_TYPES.ADD_HEAD_WARNING, payload: {message, type}})
		setTimeout(() => {
			dispatch({type: ACTION_TYPES.CLEAR_HEAD_WARNING})
		}, 6000)
	}
}
