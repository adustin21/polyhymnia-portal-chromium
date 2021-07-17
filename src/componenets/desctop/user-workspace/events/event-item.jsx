import style from "./event-item.module.css"

const EventItem = (props) => {
	let title = props.title === undefined ? "Неизвестно" : props.title;
	let content = props.content === undefined ? "Неизвестно" : props.content;
	return (
		<div className={style.container}>
			<div className={style.title}>{title}</div>
			<div className={style.content}>{content}</div>
		</div>
	);
}

export default EventItem;
