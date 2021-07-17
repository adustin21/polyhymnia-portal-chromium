import { ACTION_TYPES } from "../constants/types"

export const changeSignUpData = (payload) => {
	return {
		type: ACTION_TYPES.CHANGE_SIGN_UP_DATA,
		payload
	}
}
