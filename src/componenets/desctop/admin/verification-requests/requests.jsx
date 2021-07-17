import { useEffect } from 'react';
import { getVerificationRequests } from '../../../../redux/actions/getVerificationRequest';
import Loader from '../../_tools/loader/loader';
import VerificationRequest from './request';
import style from './requests.module.css'

const VerificationRequests = ({state, dispatch}) => {
	useEffect(() => {
		dispatch(getVerificationRequests());
	}, [dispatch])
	return (
		!state.isLoad ?
		<Loader /> :
		<div className={style.container}>
			{state.requests.map(element => {
				return <VerificationRequest
				dispatch={dispatch}
				key={element.login}
				canClick={state.canClick}
				login={element.login}
				firstName={element.firstName}
				lastName={element.lastName}
				accessLevel={element.accessLevel}/>
			})}
		</div>
	)
}

export default VerificationRequests;
