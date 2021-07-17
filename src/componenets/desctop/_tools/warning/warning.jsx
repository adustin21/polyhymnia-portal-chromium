import style from "./warning.module.css"
import icon from "./images/warning.png"

const Warning = (props) => {
	return (
	<div className={style.container}>
		<div className={style.icon} style={{backgroundImage: `url(${icon})`}}></div>
		<div className={style.code}>{props.code}</div>
		<div className={style.text}>{props.message}</div>
	</div>
	);
}

export default Warning;
