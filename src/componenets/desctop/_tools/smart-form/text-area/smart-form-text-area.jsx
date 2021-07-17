import style from "./smart-form-text-area.module.css"
import commonStyle from "../common.module.css"
import { useState } from "react";

const SmartFormTextArea = ({type, value, name, onChangeFunction, rule, warning, placeholder, rows}) => {
	let [needCheckRule, setNeedCheckRule] = useState(false);
	return (
		<div className={commonStyle.container}>
			<textarea
			style={(rule(value) || !needCheckRule) ? {} : {borderColor: "#d40303", color: "#d40303"}}
			className={style.textarea}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChangeFunction}
			onBlur={()=>{setNeedCheckRule(true)}}
			rows={rows}/>
			{(rule(value) || !needCheckRule) ? <div></div> : <div className={style.warning}>{warning}</div>}
		</div>
	)
}

export default SmartFormTextArea;
