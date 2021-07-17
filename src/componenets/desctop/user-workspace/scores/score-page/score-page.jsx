import { Redirect, useLocation } from "react-router-dom";
import Loader from "../../../_tools/loader/loader";
import style from "./score-page.module.css"
import { loadScorePage } from "../../../../../redux/actions/loadScorePage";
import { useEffect } from "react";
import Part from "./part";

const	ScorePage = ({state, dispatch}) => {
	const location = useLocation();
	const pageId = location.pathname.match(/\/[\w]+$/)[0].slice(1);
	useEffect(() => {
		if (state.id !== pageId && /page\/[\w]+/.test(location.pathname))
			dispatch(loadScorePage(pageId));
	}, [dispatch, location.pathname, pageId, state.id])
	if (!/page\/[\w]+/.test(location.pathname)) {
		return(
			<Redirect to="/score" />
		)
	}else{
		return (
			state.nowLoad ?
			<Loader /> :
			<div className={style.container}>
				<div className={style.title}>
					{state.title}
					<div className={style.composer}>{state.composer}</div>
				</div>
				<div className={style.content}>
					{state.parts.map((part => {
						return <Part key={part.name} state={part} dispatch={dispatch}/>
					}))}
				</div>
			</div>
		)
	}

}

export default ScorePage;
