import style from './title.module.css'

const ParagraphTitle = (props) => {
	return (
		<div className={style.container}>
			{props.children}
		</div>
	)
}

export default ParagraphTitle;
