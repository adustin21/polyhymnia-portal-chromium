import { signOut } from "../../../../../redux/actions/signOut";
import style from "./menu.module.css"

const Menu = ({dispatch}) => {
	return(
		<div className={style.container}>
			<div className={style.item}>Настройки</div>
			<div className={style.item} onClick={()=>dispatch(signOut())}>Выход</div>
		</div>
	);
}

export default Menu;
