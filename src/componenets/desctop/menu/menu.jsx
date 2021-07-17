import style from "./menu.module.css"
import {NavLink} from 'react-router-dom'

const Menu = (props) => {
	return (
		<div className={style.container}>
			<NavLink activeClassName={style.active} to="../../score">Ноты</NavLink>
			<NavLink activeClassName={style.active} to="../../ads">Объявления</NavLink>
			<NavLink activeClassName={style.active} to="../../learn">Обучение</NavLink>
		</div>
	);
}

export default Menu;
