import style from "./tiled-selector.module.css";

const TiledSelector = ({children, width, onSelectFunction}) => {
	const setValue = (event) => {
		const prevTiles = document.getElementsByClassName(style.activeTile);
		if (prevTiles.length) {
			prevTiles[0].classList.toggle(style.activeTile)
		}
		event.target.classList.toggle(style.activeTile);
		onSelectFunction(event.target.id);
	}
	return (
		<div className={style.container}
		onClick={(event) => {setValue(event)}}
		style={{
			gridTemplateColumns: `repeat(${width}, 1fr)`
			}}>
			{children}
		</div>
	)
}
export default TiledSelector;
