import { signOut } from '../../../redux/actions/signOut';
import { DATA_PATH } from '../../../redux/constants/data-path';
import ActionButton from '../_tools/smart-form/action-button/action-button'
import style from './verification.module.css'

const Verification = ({state, dispatch}) => {
	return(
		<div className={style.container}>
			<div className={style.box}>
				<div className={style.avatar} style={{
					backgroundImage: `url(${DATA_PATH.images + state.avatar})`
				}}></div>
				<div className={style.name}>{state.firstName} {state.lastName}</div>
				<div className={style.info}>
					Добро пожаловать! <br /> <br />
					Вы успешно прошли регистрацию! <br />  <br />
					Пожалуйста, дождитесь подтверждения Вашего аккаунта администрацией хора.<br />
					После этого вам станет доступен полный функционал портала.
				</div>
				<ActionButton
				status={!state.wait}
				onClickFunction={() => {
					dispatch(signOut())
				}}
				text={"Выйти"}
				disableText={"Подождите"}/>
			</div>
		</div>
	)
}
export default Verification;
