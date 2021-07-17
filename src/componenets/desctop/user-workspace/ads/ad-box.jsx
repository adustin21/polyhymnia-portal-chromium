import style from "./ad-box.module.css"

const AdBox = ({title, text, creatingDate}) => {
	return (
		<div className={style.container}>
			<div className={style.title}>
				{title}
				<div className={style.timeLabel}>{creatingDate}</div>
			</div>
			<div className={style.content}>
				<div className={style.text}>{text}</div>
			</div>
		</div>
	);
}

export default AdBox;
