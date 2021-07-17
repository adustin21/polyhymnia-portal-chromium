import { useState } from 'react';
import { PARTS_NAME } from '../../../../../redux/constants/parts-name';
import style from './add-part.module.css'

const AddPart = ({parts, setParts}) => {
	const activeList = [];
	for (const key in PARTS_NAME) {
		if (!parts.includes(key)) {
			activeList.push(key);
		}
	}
	const [hideMenu, setHideMenu] = useState(true);
	return (
		<div className={style.container}>
			<div className={style.title} onClick={()=>setHideMenu(!hideMenu)}>
				{hideMenu ? 'Добавить' : 'Скрыть'}
			</div>
			{hideMenu ?

				<div></div> :

				<div className={style.partBox}>
					{activeList.map(element => {
						return <div className={style.part}
						key={element}
						onClick={() => {
							const newParts = [...parts];
							newParts.push(element)
							setParts(newParts)
							setHideMenu(!hideMenu)
						}
						}>{PARTS_NAME[element]}</div>
					})}
				</div>
		}

		</div>
	)
}
export default AddPart;
