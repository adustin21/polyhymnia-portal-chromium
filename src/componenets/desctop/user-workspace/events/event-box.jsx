import style from "./event-box.module.css"
import EventItem from "./event-item";

const EventBox = (props) => {
	let title = "Объявление";
	let text = "Пожалуйста, обратите  ваше внимание на тот факт, что его свсятейшество Патриарх всея Руси не приемлет употребление табака. На концерте в Патриархии убедительная просьба не использовать сигареты и вейпы. Спасибо!"
	let date = "12.07.2020"
	return (
		<div className={style.container}>
			<div className={style.title}>
				{title}
				<div className={style.labelDate}>{date}</div>
			</div>
			<EventItem title="Дата" content="12.07.2021"/>
			<EventItem title="Дата" content="12.07.2021"/>
			<EventItem title="Дата" content="12.07.2021"/>
			<EventItem title="Дата" content="12.07.2021"/>
			<EventItem title="Дата" content="12.07.2021"/>
		</div>
	);
}

export default EventBox;
