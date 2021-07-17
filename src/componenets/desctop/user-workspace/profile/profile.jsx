import { signOut } from "../../../../redux/actions/signOut";
import { DATA_PATH } from "../../../../redux/constants/data-path";
import Search from "../../header/search/search"
import ActionButton from "../../_tools/smart-form/action-button/action-button";
import style from "./profile.module.css"

const Profile = ({searchState, userState, dispatch}) => {
	return (
		<div className={style.container}>
			<Search searchResults={searchState} dispatch={dispatch}/>
			<div className={style.photo}
			style={{backgroundImage: `url(${DATA_PATH.images}${userState.avatar})`}}></div>
			<div className={style.userName}>
				{userState.firstName} {userState.lastName}
			</div>
			<div className={style.voice}>@{userState.login}</div>
			<div style={{display: "grid"}}>
				<ActionButton status={true}
				onClickFunction={() => {dispatch(signOut())}}
				text="Выход"
				disableText="Выходим..." />
			</div>
		</div>
	);
}

export default Profile;
