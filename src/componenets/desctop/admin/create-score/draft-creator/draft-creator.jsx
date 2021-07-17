import { useState } from 'react'
import { createScoreDraft } from '../../../../../redux/actions/createScoreDraft';
import ActionButton from '../../../_tools/smart-form/action-button/action-button'
import SmartFormInput from '../../../_tools/smart-form/input/smart-form-input';
import AddPart from './add-part';
import style from './draft-creator.module.css'
import DraftCreatorPart from './part';

const DraftCreator = ({state, dispatch}) => {
	const [hideCreator, setHideCreator] = useState(true);
	const [inputs, setInputs] =  useState({title: '', composer: ''})
	const [parts, setParts] = useState(['common'])
	return (
		<div className={style.container}>
			{hideCreator ?

			<ActionButton status={true}
			onClickFunction={()=>{setHideCreator(false)}}
			text={'Создать новую партитуру'} disableText='Ожидайте' /> :

			<div className={style.form}>
				<div className={style.inputs}>
				<SmartFormInput
				type="text"
				value={inputs.title}
				name="title"
				onChangeFunction={(event)=>{setInputs({...inputs, title: event.target.value})}}
				rule={(text)=>{return (text !== '')}}
				warning="Поле не должно быть пустым"
				placeholder="Название" />
				<SmartFormInput
				type="text"
				value={inputs.composer}
				name="title"
				onChangeFunction={(event)=>{setInputs({...inputs, composer: event.target.value})}}
				rule={(text)=>{return (text !== '')}}
				warning="Поле не должно быть пустым"
				placeholder="Композитор" />
				</div>
				<div className={style.parts}>
					<div className={style.partsTitle}>Партии:</div>
					{parts.map((part, index) => {
						return <DraftCreatorPart
						key={index} part={part} index={index}
						parts={parts} setParts={setParts}/>
					})}
					<AddPart parts={parts} setParts={setParts}/>

				</div>
				<ActionButton status={parts.length && inputs.title !== '' && inputs.composer !== '' && !state.draftLoading}
				onClickFunction={()=>{dispatch(createScoreDraft(inputs.title, inputs.composer, parts))}}
				text={'Продолжить'} disableText='Продолжить'/>
			</div>
			}
		</div>
	)
}

export default DraftCreator;
