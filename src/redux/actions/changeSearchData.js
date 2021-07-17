import { ACTION_TYPES } from "../constants/types"

export const changeSearchData = (payload) => {
	return {
		type: ACTION_TYPES.SET_SEARCH_DATA,
		payload
	}
}
