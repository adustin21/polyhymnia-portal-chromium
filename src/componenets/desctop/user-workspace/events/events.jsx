import EventBox from "./event-box";
import style from "./events.module.css"

const Events = (props) => {
	return (
		<div className={style.container}>
			<EventBox/>
			<EventBox/>
			<EventBox/>
		</div>
	);
}

export default Events;
