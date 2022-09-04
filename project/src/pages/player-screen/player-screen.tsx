import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchFilmAction } from '../../store/api-actions';
import { getCurrentFilm } from '../../store/films-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

const TIME_INTERPRETATION = 60;
const TIME_STEP = 59;

type RunTime = {
  hours: number,
  minutes: number,
  seconds: number,
};

function checkTime(){
  let lastTime = 0;

  return function(time : number | undefined){
    if(!time){
      return false;
    }

    if(lastTime < Math.floor(time)){
      lastTime++;
      return true;
    }

    return false;
  };
}

const isSecondPassed = checkTime();

const getFormattedTime = (runTime: RunTime) : string => {
  const {hours, minutes, seconds} = runTime;
  return `-${hours < 10 && hours > 0 ? '0' : ''}${hours > 0 ? `${hours}:` : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const getTimeDecomposition = (runTime: number) : RunTime => {
  const minutesToHours = Math.floor(runTime / TIME_INTERPRETATION);
  const decomposedTime = {
    hours: minutesToHours,
    minutes: Math.floor(runTime - minutesToHours * TIME_INTERPRETATION),
    seconds: 0,
  };

  return decomposedTime;
};

function PlayerScreen(): JSX.Element {
  const filmId = Number(useParams().id);
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(getCurrentFilm);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if(filmId !== currentFilm.id){
      dispatch(fetchFilmAction(filmId));
    }
  }, [currentFilm.id, dispatch, filmId]);

  const {
    videoLink,
    previewImage,
    runTime,
    name,
  } = currentFilm;

  const [timeLeft, setTimeLeft] = useState(getTimeDecomposition(runTime));
  const [formattedTime, setFormattedTime] = useState(getFormattedTime(timeLeft));

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleChangeTime = (passedTime : number | undefined) => {
    const currentTime = timeLeft;

    if(isSecondPassed(passedTime)){
      currentTime.seconds--;

      if(currentTime.seconds < 0){
        currentTime.minutes--;
        currentTime.seconds = TIME_STEP;
      }

      if(currentTime.minutes < 0){
        currentTime.hours--;
        currentTime.minutes = TIME_STEP;
      }

      if(currentTime.minutes === 0 && currentTime.hours === 0 && currentTime.seconds === 0){
        setIsPlaying(false);
        videoRef.current?.load();
      }

      setTimeLeft(currentTime);
      setFormattedTime(getFormattedTime(currentTime));
    }
  };

  useEffect(() => {
    if(videoRef.current === null){
      return;
    }

    if(isFullScreen){
      videoRef.current.requestFullscreen();
      setIsFullScreen(false);
    }

    if(isPlaying){
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isFullScreen, isPlaying]);

  if(!currentFilm.id){
    return <LoadingScreen />;
  }

  return (
    <div className="player">
      <video
        src={videoLink}
        ref={videoRef}
        className="player__video"
        poster={previewImage}
        onTimeUpdate={() => {handleChangeTime(videoRef.current?.currentTime);}}
      >
      </video>
      <Link to={`/films/${currentFilm.id}`} type="button" className="player__exit">Exit</Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{formattedTime}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={handlePlay}
          >
            {
              !isPlaying ?
                (
                  <>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </>

                ) :
                (
                  <>
                    <svg viewBox="0 0 14 21" width="14" height="21">
                      <use xlinkHref="#pause"></use>
                    </svg>
                    <span>Pause</span>
                  </>
                )
            }
          </button>
          <div className="player__name">{name}</div>
          <button type="button" className="player__full-screen"
            onClick={handleFullScreen}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
