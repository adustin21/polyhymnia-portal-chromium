import { useEffect } from 'react';
import { getScoreDraft } from '../../../../redux/actions/getScoreDraft';
import DraftCreator from './draft-creator/draft-creator'
import Loader from '../../_tools/loader/loader';
import style from './create-sсore.module.css'
import Draft from './draft/draft';

const CreateSсore = ({state, dispatch}) => {
	useEffect(() => {
		dispatch(getScoreDraft());
	}, [dispatch])
	return (
		!state.isLoad ?
		<Loader /> :
		<div className={style.container}>
			{
			state.draftExist ?
			<Draft state={state} dispatch={dispatch} />:
			<DraftCreator state={state} dispatch={dispatch}/>
		 	}
		</div>
	)
}

export default CreateSсore;
