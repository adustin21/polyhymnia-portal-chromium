import Menu from "./menu/menu";
import style from "./profile.module.css"
import menuStyle from "./menu/menu.module.css"
import { DATA_PATH } from "../../../../redux/constants/data-path";

const Profile = (props) => {
	let firstName = props.firstName === undefined ? 'Гость' : props.firstName;
	let avatar = props.avatar === undefined ? '' : props.avatar;
	const showMenu = () => {
		if (props.wait)
			return ;
		let menu = document.getElementsByClassName(menuStyle.container)[0];
		menu.style.display = (menu.style.display === "") ?
		"block" :
		"";
	}
	return(
		<div className={style.container} onClick={showMenu}>
			<div className={style.name}>
				{firstName}
			</div>
			<div className={style.avatar} style={{
				backgroundImage: `url(${DATA_PATH.images + avatar})`
			}}></div>
			<div className={style.arrow}>^</div>
			<Menu dispatch={props.dispatch}/>
		</div>
	);
}

export default Profile;
