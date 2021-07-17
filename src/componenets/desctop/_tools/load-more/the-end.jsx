import style from "./the-end.module.css";

const TheEnd = (props) => {
	return (
		<div className={style.container}>
			<div className={style.text}>{props.children}</div>
		</div>
	)
}

export default TheEnd;
