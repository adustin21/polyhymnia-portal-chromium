import style from './paragraph.module.css'

const AdminParagraph = (props) => {
	return (
		<div className={style.container}>
			{props.children}
		</div>
	)
}

export default AdminParagraph;
