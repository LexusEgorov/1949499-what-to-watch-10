import './loading-screen.css';

function LoadingScreen() : JSX.Element{
  return (
    <section className="loading">
      <p>loading...</p>
      <img src="./img/spinner.png" alt="" width={100}/>
    </section>
  );
}

export default LoadingScreen;
