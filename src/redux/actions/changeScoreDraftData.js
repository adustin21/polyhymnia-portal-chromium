import { ACTION_TYPES } from "../constants/types"

export const changeScoreDraftData = (payload) => {
	return {
		type: ACTION_TYPES.SET_SCORE_DRAFT,
		payload
	}
}
