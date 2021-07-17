import style from "./smart-form-file-input.module.css"
import commonStyle from "../common.module.css"

const SmartFormFileInput = ({name, accept, text, onChangeFunction,}) => {
	return (
		<div className={commonStyle.container}>
			<div className={style.container}>
			<input
			onChange={event=>onChangeFunction(event.target.files[0])}
			className={style.input}
			type={'file'}
			name={name}
			accept={accept}/>
			<label className={style.label} htmlFor={name}>{text}</label>
			</div>
		</div>
	)
}

export default SmartFormFileInput;
