import { Redirect, Route } from 'react-router'
import SignInBox from '../sign-in/sign-in-box'
import SignUp from '../sign-up/sign-up'
import style from './homepage.module.css'
import LinkBox from './linkbox'

const Homepage = ({state, dispatch}) => {
	return (
		<div className={style.container}>
			<Redirect to="/"/>
			<div className={style.box}>
				<div className={style.title}>Polyhymnia</div>
				<div className={style.warning}>Частный портал</div>
				<div className={style.contentBox}>
				<Route exact path="/">
					<LinkBox />
				</Route>
				<Route exact path="/sign-in">
					<SignInBox state={state.signInData} dispatch={dispatch}/>
				</Route>
				<Route exact path="/sign-up">
					<SignUp state={state.signUpData} dispatch={dispatch}/>
				</Route>
				</div>
			</div>
		</div>
	)
}

export default Homepage;
