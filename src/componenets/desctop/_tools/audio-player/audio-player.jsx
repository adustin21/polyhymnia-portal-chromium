import style from "./audio-player.module.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({url}) => {
  return (
	<div className={style.container}>
		<AudioPlayer
  			autoPlay={false}
  			src={url}
			showJumpControls={true}
			showSkipControls={false}
			progressJumpSteps={{ backward: 10000, forward: 10000 }}
  		/>
	</div>
  )
  };

export default Player;
