import { ACTION_TYPES } from "../constants/types"

export const changeAddDraftData = (payload) => {
	return {
		type: ACTION_TYPES.CHANGE_ADD_DATA,
		payload
	}
}
