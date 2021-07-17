import { ACTION_TYPES } from "../constants/types"

export const changeScoresData = (payload) => {
	return {
		type: ACTION_TYPES.SET_SCORES_DATA,
		payload
	}
}
