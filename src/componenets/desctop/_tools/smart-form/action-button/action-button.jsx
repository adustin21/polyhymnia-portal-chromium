import style from './action-button.module.css'
import commonStyle from '../common.module.css'

const ActionButton = ({ status, onClickFunction, text, disableText }) => {
	return (
		<div className={commonStyle.container}>
			{status ?
			<div className={style.text} onClick={onClickFunction}>{text}</div> :
			<div className={style.disableText}>{disableText}</div>}
		</div>
	)
}

export default ActionButton;
