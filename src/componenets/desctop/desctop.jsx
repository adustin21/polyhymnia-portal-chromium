import { Redirect, Route } from "react-router-dom";
import AdminPanel from "./admin/admin";
import Header from "./header/header"
import Scores from "./user-workspace/scores/scores"
import ScorePage from "./user-workspace/scores/score-page/score-page";
import FileLoad from "./user-workspace/file-load/file-load";
import style from './desctop.module.css'
import Menu from "./menu/menu";
import Ads from "./user-workspace/ads/ads";
import TheEnd from "./_tools/load-more/the-end";
import Profile from "./user-workspace/profile/profile";
import BottomMenu from '../mobile/menu/menu';

const Desctop = ({state, dispatch}) => {
	return (
		 <div>
			<Route path={/(\/sign-in|\/sign-up)/}>
				<Redirect to="/score" />
			</Route>
			<Header
			userData={state.userData}
			searchResults={state.searchData}
			dispatch={dispatch}/>
			<BottomMenu />
			<div className={style.container}>
				<div className={style.leftColumn}>
					<Menu />
				</div>
				<div className={style.rightColumn}>
					<Route path='/admin' >
						<AdminPanel state={state} dispatch={dispatch}/>
					</Route>
					<Route path='/score' >
						<Scores state={state.scoresData} dispatch={dispatch} />
					</Route>
					<Route path='/page' >
						<ScorePage state={state.scoresData.nowScore} dispatch={dispatch}/>
					</Route>
					<Route path='/fileloader' >
						<FileLoad state={state.downloadingData} dispatch={dispatch}/>
					</Route>
					<Route path='/ads' >
						<Ads state={state.adsData} dispatch={dispatch}/>
					</Route>
					<Route path='/learn' >
						<TheEnd>Уроков больше нет. Бегом на переменку!</TheEnd>
					</Route>
					<Route path='/profile' >
						<Profile searchState={state.searchData}
						userState={state.userData} dispatch={dispatch} />
					</Route>
				</div>
			</div>
		</div>
	)
}

export default Desctop;
