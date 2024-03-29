import { useEffect, useRef, useState } from 'react';

const Video = {
  DELAY: 1000,
  BEGIN: 0,
};

type VideoplayerProps = {
  src: string;
  imgSrc: string;
};

let timeout: NodeJS.Timeout;

function Videoplayer({src, imgSrc} : VideoplayerProps) : JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseOver = () => {
    timeout = setTimeout(() => {
      setIsPlaying(true);
    }, Video.DELAY);
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    clearTimeout(timeout);
  };

  useEffect(() => {
    if(videoRef.current === null || isError){
      return;
    }

    if(isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.load();
  }, [isError, isPlaying]);

  return (
    <div className='small-film-card__image'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <video muted poster={imgSrc} ref={videoRef} width="280" height="175"
        onError={() => {setIsError(true);}}
      >
        <source src={src} type="video/mp4"/>
      </video>
    </div>
  );
}

export default Videoplayer;
