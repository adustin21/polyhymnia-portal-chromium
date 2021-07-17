import { NavLink } from 'react-router-dom'
import style from './link-button.module.css'
import commonStyle from '../common.module.css'

const LinkButton = ({ status, url, text, disableText }) => {
	return (
		<div className={commonStyle.container}>
			{status ?
			<NavLink className={style.text} to={url}>{text}</NavLink> :
			<div className={style.text}>{disableText}</div>}
		</div>
	)
}

export default LinkButton;
