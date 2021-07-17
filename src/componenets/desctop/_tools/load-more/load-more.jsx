import style from "./load-more.module.css"
import ActionButton from '../smart-form/action-button/action-button'
import { useEffect } from "react";

const LoadMore = ({smartEvent, status}) => {
	const scrollHandler = () => {
		if (document.getElementsByClassName(style.container)[0] !== undefined) {
			const elementPosition = document.getElementsByClassName(style.container)[0].getBoundingClientRect();
			const pageHeight = document.documentElement.clientHeight;
			if ((elementPosition.top - pageHeight < 150) && status){
				smartEvent();
			}
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', () => {
			scrollHandler();
		});
		return () => {
			window.removeEventListener('scroll', scrollHandler)
		};
	}, [status, scrollHandler])
	return (
		<div className={style.container}>
			<ActionButton status={status}
			onClickFunction={smartEvent}
			text={"Загрузить больше"} disableText="Подождите..."/>
		</div>
	);
}

export default LoadMore;
