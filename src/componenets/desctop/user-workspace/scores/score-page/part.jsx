import style from "./part.module.css"
import { NavLink } from "react-router-dom"
import { PARTS_NAME } from "../../../../../redux/constants/parts-name";
import { DATA_PATH } from "../../../../../redux/constants/data-path";
import Player from "../../../_tools/audio-player/audio-player";

import img_pdf from './images/pdf.png'
import img_mp3 from './images/mp3.png'
import img_midi from './images/midi.png'

const Part = ({state, dispatch}) => {
	return (
		<div className={style.container}>
			<div  className={style.box}>
				<div className={style.cover}>
					<div className={style.coverTitle}>
						{PARTS_NAME[state.name].replaceAll(' ', '\n')}
					</div>
				</div>
				<div  className={style.contentBox}>
					<div className={style.audioPlayer}>
						<Player url={`${DATA_PATH.scores}${state.mp3}`}/>
					</div>
					<div  className={style.linkBox}>
						<div className={style.link} style={{display: state.pdf === '' ? "none" : ""}}>
							<div className={style.linkCover}
							style={{backgroundImage: `url(${img_pdf})`}}></div>
							<NavLink to={`../fileloader${state.pdf}`} target="_blank" rel="noopener noreferrer">
								Загрузить PDF
							</NavLink>
						</div>
						<div className={style.link} style={{display: state.mp3 === '' ? "none" : ""}}>
							<div className={style.linkCover}
							style={{backgroundImage: `url(${img_mp3})`}}></div>
							<NavLink to={`../fileloader${state.mp3}`} target="_blank" rel="noopener noreferrer">
								Загрузить MP3
							</NavLink>
						</div>
						<div className={style.link}  style={{display: state.midi === '' ? "none" : ""}}>
							<div className={style.linkCover}
							style={{backgroundImage: `url(${img_midi})`}}></div>
							<NavLink to={`../fileloader${state.midi}`} target="_blank" rel="noopener noreferrer">
								Загрузить MIDI
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Part;
