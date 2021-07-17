import style from "./results.module.css"
import { NavLink } from 'react-router-dom'
import {changeScoresData} from "../../../../../redux/actions/changeScoresData"
const Results = ({results, dispatch}) => {
	return(
			<div className={style.container}
			style={{boxShadow: !results.length ? "none" : ""}}>
				{results.map(result => {
					return (
					<NavLink  to={`/page/${result.id}`}
					onClick={() => dispatch(changeScoresData({nowScore: {...result}}))}
					className={style.item} key={result.id}>
						<div>{result.title}</div>
						<div>{result.composer}</div>
					</NavLink>
					)
				})}
			</div>

	);
}

export default Results;
