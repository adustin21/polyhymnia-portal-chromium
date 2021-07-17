import { PARTS_NAME } from '../../../../../redux/constants/parts-name';
import style from './part.module.css'

const DraftCreatorPart = ({part, index, parts, setParts}) => {
	const newParts = [...parts];
	newParts.splice(index, 1);
	return (
		<div className={style.container}>
			<div className={style.title}>{PARTS_NAME[part]}</div>
			<div className={style.delete} onClick={()=>{setParts(newParts)}}></div>
		</div>
	)
}
export default DraftCreatorPart;
