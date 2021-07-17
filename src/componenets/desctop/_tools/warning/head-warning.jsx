import style from './head-warning.module.css'

const HeadWarning = ({messages}) => {
	return(
		<div className={style.container}>
			{messages.map(message => {
				return (
				<div className={style.text} key={message.message} style={{backgroundColor: message.type}}>
					{message.message}
				</div>
				)
			})}
		</div>
	)
}

export default HeadWarning;
