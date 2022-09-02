/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchFilmAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

const TIME_INTERPRETATION = 60;
const SECOND = 1000;
const TIME_STEP = 59;

let timer: NodeJS.Timeout | undefined;

const getTimeLeft = (minutes : number) => (
  {
    hours: Math.floor(minutes / TIME_INTERPRETATION),
    minutes: minutes - Math.floor(minutes / TIME_INTERPRETATION) * TIME_INTERPRETATION,
    seconds: 0,
  }
);

function PlayerScreen(): JSX.Element {
  const filmId = Number(useParams().id);
  const {currentFilm} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const {
    videoLink,
    previewImage,
    runTime,
  } = currentFilm;

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(runTime));

  useEffect(() => {
    dispatch(fetchFilmAction(filmId));
  }, [dispatch, currentFilm, filmId]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if(videoRef.current === null){
      return;
    }

    if(isFullScreen){
      videoRef.current.requestFullscreen();
      setIsFullScreen(false);
    }

    if(isPlaying) {
      videoRef.current.play();

      timer = setInterval(() => {
        const currentTime = timeLeft;
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
          videoRef.current?.load();
          setIsPlaying(false);
        }
        setTimeLeft(currentTime);
      }, SECOND);
    } else {
      clearInterval(timer);
      videoRef.current.pause();
    }

  }, [isPlaying, isFullScreen]);

  const playHandler = () => {
    if(isPlaying){
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };

  const fullScreenHandler = () => {
    setIsFullScreen(true);
  };

  if(!currentFilm.videoLink){
    return <LoadingScreen />;
  }
  return (
    <div className="player">
      <video src={videoLink} ref={videoRef} className="player__video" poster={previewImage}></video>
      <Link to={`/films/${currentFilm.id}`} type="button" className="player__exit">Exit</Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{
            `-${timeLeft.hours < 10 && timeLeft.hours ? '0' : ''}${timeLeft.hours ? `${timeLeft.hours}:` : ''}${timeLeft.minutes < 10 ? '0' : ''}${timeLeft.minutes}:${timeLeft.seconds < 10 ? '0' : ''}${timeLeft.seconds}`
          }
          </div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={playHandler}
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
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen"
            onClick={fullScreenHandler}
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
