import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./file-load.module.css"
import { loadFileFromServer } from "../../../../redux/actions/loadFile";
import Loader from "../../_tools/loader/loader";

const FileLoad = ({state, dispatch}) => {
	const location = useLocation();
	const url = location.pathname;
	useEffect(() => {
		dispatch(loadFileFromServer(url));
	}, [dispatch, url])
	return(
		state.wait ?
		<Loader /> :
		<div className={style.container}>
			<div className={style.header}>{state.isFileExist ? "Грузи меня, грузи" : "Такого файла у меня нет, держи цветочек 🌹"}</div>
			<div className={style.add}>{state.isFileExist ? "Если загрузка не начнется в течении 30 секунд, перезагрузите страницу" : "Файл не существет"}</div>
		</div>
	)
}

export default FileLoad;
