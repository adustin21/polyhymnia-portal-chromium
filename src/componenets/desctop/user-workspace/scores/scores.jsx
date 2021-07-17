import { useEffect } from "react"
import style from "./scores.module.css"
import ScoreBox from "./score-box"
import LoadMore from '../../_tools/load-more/load-more'
import TheEnd from '../../_tools/load-more/the-end'
import Loader from '../../_tools/loader/loader'
import { loadScores } from "../../../../redux/actions/loadScores"
import { changeScoresData } from "../../../../redux/actions/changeScoresData"

const Scores = ({state, dispatch}) => {
	useEffect(() => {
	if(state.canLoadMore && state.lastLoadPage !== state.nowPage)
		dispatch(loadScores(state.nowPage));
	}, [state.nowPage, dispatch])
	if (!state.isLoad) {
		return (
			<Loader />
		)
	}else {
		return(
			<div>
				<div className={style.container}>
					{state.scores.map((score => {
						return <ScoreBox key={score.title} state={score} dispatch={dispatch}/>
					}))}
 				</div>
				{state.canLoadMore ?
				<LoadMore smartEvent={() => {dispatch(changeScoresData({nowPage: 1 + state.nowPage}))} } status={!state.nowLoad}/> :
				<TheEnd>Нот больше нет. Пойте сердцем!</TheEnd>
				}

			</div>
		)

	}
}

export default Scores;


