import style from "./menu.module.css"
import {NavLink} from 'react-router-dom'
import img_scores from './images/scores.png'
import img_ads from './images/ads.png'
import img_profile from './images/profile.png'
import img_learn from './images/learn.png'

const Menu = (props) => {
	return (
		<div className={style.container}>
			<NavLink activeClassName={style.active}to="../../score"
			style={{backgroundImage: `url(${img_scores})`}}/>
			<NavLink activeClassName={style.active} to="../../ads"
			style={{backgroundImage: `url(${img_ads})`}}/>
			<NavLink activeClassName={style.active} to="../../learn"
			style={{backgroundImage: `url(${img_learn})`}}/>
			<NavLink activeClassName={style.active} to="../../profile"
			style={{backgroundImage: `url(${img_profile})`}}/>
		</div>
	);
}

export default Menu;
