import style from "./create-ad.module.css"
import ActionButton from "../../_tools/smart-form/action-button/action-button"
import SmartFormInput from "../../_tools/smart-form/input/smart-form-input"
import SmartFormTextArea from "../../_tools/smart-form/text-area/smart-form-text-area"
import { changeAddDraftData } from "../../../../redux/actions/changeAdDraftData"
import { useState } from "react"
import { createAd } from "../../../../redux/actions/createAd"

const AdCreator = ({state, dispatch}) => {
	const [hideCreator, setHideCreator] = useState(true);
	return(
		hideCreator 	?
		<div style={{display:"grid"}}>
			<ActionButton
			status={true}
			onClickFunction={() => {setHideCreator(!hideCreator)}}
			text="Создать объявление"
			disableText="Создать объявление"
			/>
		</div>
						:
		<div className={style.container}>
			<div className={style.inputs}>
				<SmartFormInput
				type="text"
				value={state.title}
				name="title"
				onChangeFunction={event=>{dispatch(changeAddDraftData({title: event.target.value}))}}
				rule={text => {return text.length > 3}}
				warning={"Не менее четырех символов"}
				placeholder="Название" />
				<SmartFormTextArea
				type="text"
				value={state.text}
				name="text"
				onChangeFunction={event=>{dispatch(changeAddDraftData({text: event.target.value}))}}
				rule={text => {return true}}
				warning={""}
				placeholder="Текст объявления"
				rows={10}/>
			</div>
			<div className={style.buttons}>
				<div  className={style.needSend}
				onClick={() => {dispatch(changeAddDraftData({needSend: !state.needSend}))}}
				style={{backgroundColor: state.needSend ? "#038AD4" : ""}}></div>
				<ActionButton
				status={state.title.length > 3 && !state.wait}
				onClickFunction={() => {dispatch(createAd(state.title, state.text, state.needSend))}}
				text="Создать"
				disableText="Создать"/>
			</div>
		</div>
	)
}

export default AdCreator;
