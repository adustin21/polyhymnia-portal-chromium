import style from "./smart-form-input.module.css"
import commonStyle from "../common.module.css"
import { useState } from "react";

const SmartFormInput = ({type, value, name, onChangeFunction, rule, warning, placeholder}) => {
	let [needCheckRule, setNeedCheckRule] = useState(false);
	return (
		<div className={commonStyle.container}>
			<input
			style={(rule(value) || !needCheckRule) ? {} : {borderColor: "#d40303", color: "#d40303"}}
			className={style.input}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChangeFunction}
			onBlur={()=>{setNeedCheckRule(true)}}/>
			{(rule(value) || !needCheckRule) ? <div></div> : <div className={style.warning}>{warning}</div>}
		</div>
	)
}

export default SmartFormInput;
