import { changeScoreDraftData } from '../../../../../redux/actions/changeScoreDraftData';
import { loadScoreDraftFile } from '../../../../../redux/actions/loadScoreDraftFile';
import { PARTS_NAME } from '../../../../../redux/constants/parts-name';
import SmartFormFileInput from '../../../_tools/smart-form/file/smart-form-file-input';
import style from './part.module.css'

const DraftPart = ({part, dispatch, parts, index}) => {
	const appendFile = (file, fileType) => {
		const newParts = [...parts];
		newParts[index][fileType] = file;
		dispatch(changeScoreDraftData({parts: newParts}));
		dispatch(loadScoreDraftFile(newParts[index].name, file, newParts, index, fileType));
	}
	const strShorter = (str) => {
		if (str === undefined) {
			return ('Загружено');
		}
		if (str.length < 10) {
			return str;
		}else{
			return str.slice(0, 4) + "..." + str.slice(str.length - 5);
		}
	}
	return (
		<div className={style.container}>
			<div className={style.title}>{PARTS_NAME[part.name]}</div>
			<div className={style.files}>
				<SmartFormFileInput name={`${part.name}__pdf`}
				onChangeFunction={(file)=>{appendFile(file, 'pdf')}}
				accept="application/pdf"
				text={part.pdf === '' ? "Загрузить pdf" : strShorter(part.pdf.name)}/>
				<SmartFormFileInput name={`${part.name}__mp3`}
				onChangeFunction={(file)=>{appendFile(file, 'mp3')}}
				accept=".mp3"
				text={part.mp3 === '' ? "Загрузить mp3" : strShorter(part.mp3.name)}/>
				<SmartFormFileInput name={`${part.name}__midi`}
				onChangeFunction={(file)=>{appendFile(file, 'midi')}}
				accept={".mid"}
				text={part.midi === '' ? "Загрузить midi" : strShorter(part.midi.name)}/>
			</div>
		</div>
	)
}

export default DraftPart;
