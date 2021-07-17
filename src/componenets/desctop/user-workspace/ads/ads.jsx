import { useEffect } from "react";
import { getAds } from "../../../../redux/actions/getAds";
import Loader from "../../_tools/loader/loader";
import AdBox from "./ad-box"
import style from "./ads.module.css"
import TheEnd from "../../_tools/load-more/the-end";

const Ads = ({state, dispatch}) => {
	useEffect(() => {
		dispatch(getAds());
	}, [dispatch])
	return (
		!state.isLoad 	?
		<Loader />		:
		<div className={style.container}>
			{state.ads.map((ad) => {
				return <AdBox key={ad._id} title={ad.title} text={ad.text} creatingDate={ad.creatingDate}/>
			})}
			<TheEnd>Объявлений больше нет. Глашатай Умер.</TheEnd>
		</div>
	);
}

export default Ads;
