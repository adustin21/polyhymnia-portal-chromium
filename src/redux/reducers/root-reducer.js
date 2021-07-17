import { combineReducers } from "redux";
import { preloadReducer } from "./preload-reducer";
import { userDataReducer } from "./user-data-reducer";
import { signInReducer } from "./sign-in-reducer";
import { headWarningReducer } from "./head-warning-reducer";
import { VerificationRequestsReducer } from "./verification-requests-reducer";
import { createScoreReducer } from "./create-score-reducer";
import { scoresDataReducer } from "./scores-data-reducer";
import { searchDataReducer } from "./search-reducer";
import { signUpReducer } from "./sign-up-reducer";
import { downloadFileReducer } from "./download-file-reducer";
import { addDraftReducer } from "./add-draft-reducer";
import { adsDataReduser } from "./ads-data-reducer";

export const rootReducer = combineReducers({
	preload: preloadReducer,
	userData: userDataReducer,
	signInData: signInReducer,
	signUpData: signUpReducer,
	headWarning: headWarningReducer,
	verificationRequests: VerificationRequestsReducer,
	createScore: createScoreReducer,
	scoresData: scoresDataReducer,
	searchData: searchDataReducer,
	downloadingData: downloadFileReducer,
	addDraftData: addDraftReducer,
	adsData: adsDataReduser,
});
