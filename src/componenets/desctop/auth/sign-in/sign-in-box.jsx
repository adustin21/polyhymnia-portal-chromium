import { changeSignInData } from '../../../../redux/actions/changeSignInData';
import { signIn } from '../../../../redux/actions/signIn';
import ActionButton from '../../_tools/smart-form/action-button/action-button';
import SmartFormInput from '../../_tools/smart-form/input/smart-form-input'
import style from './sign-in-box.module.css'

const SignInBox = ({state, dispatch}) => {
	const inputRule = (text) => {
		const checkRegEx = /^[\w\S]{4}[\w\S]{0,26}$/.test(text)
		if(checkRegEx)
			return true
		return false
	}
	const inputChange = (event) => {
		let data = state;
		data[event.target.name] = event.target.value;
		dispatch(changeSignInData(data));
	}
	return(
		<div className={style.signInBox}>
			<SmartFormInput
			type={"text"}
			value={state.login}
			name="login"
			placeholder="Логин"
			onChangeFunction={inputChange}
			rule={inputRule}
			warning="От 4 до 30 симв. без пробелов"/>

			<SmartFormInput
			type={"password"}
			value={state.password}
			name="password"
			placeholder="Пароль"
			onChangeFunction={inputChange}
			rule={inputRule}
			warning="От 4 до 30 симв. без пробелов"/>

			<ActionButton
			status={inputRule(state.login) && inputRule(state.password) && !state.wait}
			onClickFunction={() => {dispatch(signIn(state.login, state.password))}}
			text="Вход" disableText="Вход" />
		</div>
	)
}

export default SignInBox;
