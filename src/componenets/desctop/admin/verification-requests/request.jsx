import ActionButton from '../../_tools/smart-form/action-button/action-button'
import style from './request.module.css'
import { verifyUser } from '../../../../redux/actions/verifyUser';
import { addHeadWarning } from '../../../../redux/actions/addHeadWarning';

const VerificationRequest = ({login, firstName, lastName, accessLevel, canClick, dispatch}) => {
	return (
		<div className={style.container}>
			<div className={style.login}>{login}</div>
			<div className={style.name}>{firstName} {lastName}</div>
			<div className={style.accessLevel}>{accessLevel}</div>
			<ActionButton status={canClick}
			onClickFunction={() => {dispatch(verifyUser(login))}}
			text={'Принять'} disableText='Ожидайте'/>
			<ActionButton status={canClick}
			onClickFunction={() => {dispatch(addHeadWarning("Эта функция недоступна в данный момент"))}}
			text={'Отклонить'} disableText='Ожидайте'/>
		</div>
	)
}

export default VerificationRequest;
