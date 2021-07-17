import style from "./loader.module.css"

const Loader = (props) => {
	return (
	<div className={style.container}>
		<div className={style.box}>
			<div className={style.round1} ></div>
			<div className={style.round2} ></div>
			<div className={style.round3} ></div>
		</div>
	</div>
	);
}

export default Loader;
