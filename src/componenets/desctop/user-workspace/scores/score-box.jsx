import { NavLink } from "react-router-dom";
import { changeScoresData } from "../../../../redux/actions/changeScoresData";
import { DATA_PATH } from "../../../../redux/constants/data-path";
import style from "./score-box.module.css"

const ScoreBox = ({state, dispatch}) => {
	return (
		<NavLink to={'/page/' + state.id} className={style.container}
		onClick={() => dispatch(changeScoresData({nowScore: {...state}}))}
		style={{backgroundImage:`url(${DATA_PATH.scores}/default-cover.png)`}}>
				<div className={style.description}>
					<div className={style.title}>{state.title}</div>
					<div className={style.composer}>{state.composer}</div>
				</div>
		</NavLink>
	);
}

export default ScoreBox;
