import { useEffect } from "react"
import { getUserData } from "../../../redux/actions/getUserData"
import style from "./header.module.css"
import Logo from "./logo/logo"
import Profile from "./profile/profile"
import Search from "./search/search"

const Header = ({userData, searchResults, dispatch}) => {
	useEffect(() => {
		dispatch(getUserData())
	}, [userData.avatar, userData.firstName, dispatch])
	return(
		<div className={style.container}>
			<Logo />
			<div className={style.searchAndProfile}>
				<Search searchResults={searchResults} dispatch={dispatch}/>
				<Profile avatar={userData.avatar}
				firstName={userData.firstName}
				wait={userData.wait}
				dispatch={dispatch}/>
			</div>
		</div>
	);
}

export default Header;
