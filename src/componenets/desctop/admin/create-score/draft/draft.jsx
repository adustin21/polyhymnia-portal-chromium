import { changeScoreDraftData } from '../../../../../redux/actions/changeScoreDraftData'
import { createScore } from '../../../../../redux/actions/createScore'
import ActionButton from '../../../_tools/smart-form/action-button/action-button'
import SmartFormInput from '../../../_tools/smart-form/input/smart-form-input'
import style from './draft.module.css'
import DraftPart from './part'

const Draft = ({state, dispatch}) => {
	return (
		<div className={style.container}>
			<div className={style.inputs}>
				<SmartFormInput
				type={"text"}
				value={state.title}
				name={"title"}
				onChangeFunction={(event) => {dispatch(changeScoreDraftData({title: event.target.value}))}}
				rule={text => {return (text !== '')}}
				warning={"Поле не должно быть пустым"}
				placeholder={"Название"} />
				<SmartFormInput
				type={"text"}
				value={state.composer}
				name={"composer"}
				onChangeFunction={(event) => {dispatch(changeScoreDraftData({composer: event.target.value}))}}
				rule={text => {return (text !== '')}}
				warning={"Поле не должно быть пустым"}
				placeholder={"Композитор"} />
			</div>
			{state.parts.map((part, index) => {
				return <DraftPart part={part} dispatch = {dispatch}
				parts={state.parts} index={index} />
			})}
			<div  className={style.buttons}>
				<ActionButton
				status={!state.draftLoading}
				onClickFunction={()=>dispatch(changeScoreDraftData({draftExist: false}))}
				text="Отмена"
				disableText="Отмена"/>
				<ActionButton
				status={state.title !== '' && state.title !== '' && !state.draftLoading}
				onClickFunction={()=>{dispatch(createScore(state.title, state.composer, state.parts))}}
				text="Подтвердить"
				disableText="Подтвердить"/>
			</div>
		</div>
	)
}

export default Draft;
