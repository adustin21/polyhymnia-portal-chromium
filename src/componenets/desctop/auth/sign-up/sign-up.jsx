import { changeSignUpData } from '../../../../redux/actions/changeSignUpData';
import { signUp } from '../../../../redux/actions/signUp';
import ActionButton from '../../_tools/smart-form/action-button/action-button';
import SmartFormInput from '../../_tools/smart-form/input/smart-form-input'
import TiledSelector from '../../_tools/smart-form/tiled-selector/tiled-selector'
import style from './sign-up.module.css'

const SignUpBox = ({state, dispatch}) => {
	const inputRule = (text) => {
		const checkRegEx = /^[\w\S]{4}[\w\S]{0,26}$/.test(text)
		return checkRegEx;
	}
	const mailRule = (text) => {
		const checkRegEx = /^[\w\S]+@[\w\S]+\.[\w\S]{1,6}$/.test(text);
		return checkRegEx;
	}
	const inputChange = (event) => {
		let data = state;
		data[event.target.name] = event.target.value;
		dispatch(changeSignUpData(data));
	}
	return(
		<div  className={style.container}>
			<div className={style.signUpBox}>
			<SmartFormInput
			type={"text"}
			value={state.login}
			name="login"
			placeholder="Логин"
			onChangeFunction={inputChange}
			rule={inputRule}
			warning="От 4 до 30 симв. без пробелов"/>

			<SmartFormInput
			type={"text"}
			value={state.mail}
			name="mail"
			placeholder="Адрес эл. почты"
			onChangeFunction={inputChange}
			rule={mailRule}
			warning="В формате example@example.com"/>

			<SmartFormInput
			type={"password"}
			value={state.password}
			name="password"
			placeholder="Пароль"
			onChangeFunction={inputChange}
			rule={inputRule}
			warning="От 4 до 30 симв. без пробелов"/>

			<SmartFormInput
			type={"password"}
			value={state.w_password}
			name="w_password"
			placeholder="Пароль повторно"
			onChangeFunction={inputChange}
			rule={(text) => {return text === state.password}}
			warning="Пароли не совпадают"/>

			<SmartFormInput
			type={"text"}
			value={state.firstName}
			name="firstName"
			placeholder="Имя"
			onChangeFunction={inputChange}
			rule={inputRule}
			warning="От 4 до 30 симв. без пробелов"/>

			<SmartFormInput
			type={"text"}
			value={state.lastName}
			name="lastName"
			placeholder="Фамилия"
			onChangeFunction={inputChange}
			rule={inputRule}
			warning="От 4 до 30 симв. без пробелов"/>

			<TiledSelector
			width={2}
			name="voice"
			onSelectFunction={id => dispatch(changeSignUpData({voice: id}))}>
				<div id="s" className={style.tyle}>Сопрано</div>
				<div id="a" className={style.tyle}>Альт</div>
				<div id="t" className={style.tyle}>Тенор</div>
				<div id="b" className={style.tyle}>Бас</div>
			</TiledSelector>

		</div>
			<ActionButton
			status={inputRule(state.login) &&
				inputRule(state.password) &&
				state.password === state.w_password &&
				mailRule(state.mail) &&
				inputRule(state.firstName) &&
				inputRule(state.lastName) &&
				/[satb]/.test(state.voice) &&
				!state.wait}
			onClickFunction={() => {dispatch(signUp(
				state.login,
				state.password,
				state.mail,
				state.firstName,
				state.lastName,
				state.voice
			))}}
			text="Регистрация" disableText="Регистрация" />
		</div>

	)
}

export default SignUpBox;
