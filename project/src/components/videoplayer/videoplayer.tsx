import { useEffect, useRef, useState } from 'react';

const Video = {
  DELAY: 2000,
  BEGIN: 0,
};

type VideoplayerProps = {
  src: string;
  imgSrc: string;
};

let timeout: NodeJS.Timeout;

function Videoplayer({src, imgSrc} : VideoplayerProps) : JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const mouseOverHandler = () => {
    timeout = setTimeout(() => {
      setIsPlaying(true);
    }, Video.DELAY);
  };

  const mouseLeaveHandler = () => {
    setIsPlaying(false);
    clearTimeout(timeout);
  };

  useEffect(() => {
    if(videoRef.current === null){
      return;
    }

    if(isPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.load();
  }, [isPlaying]);

  return (
    <div className='small-film-card__image'
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <video muted poster={imgSrc} ref={videoRef} width="280" height="175">
        <source src={src} type="video/mp4"/>
      </video>
    </div>
  );
}

export default Videoplayer;
