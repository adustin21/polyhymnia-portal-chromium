import { ACTION_TYPES } from "../constants/types"

export const changeSignInData = (payload) => {
	return {
		type: ACTION_TYPES.CHANGE_SIGN_IN_DATA,
		payload
	}
}
