import LinkButton from '../../_tools/smart-form/link-button/link-button'
import style from './linkbox.module.css'

const LinkBox = () => {
	return(
		<div className={style.linkBox}>
			<LinkButton status={true} url="/sign-in" text="Вход" disableText="Загрузка..." />
			<LinkButton status={true} url="/sign-up" text="Регистрация" disableText="Загрузка..." />
		</div>
	)
}

export default LinkBox;
