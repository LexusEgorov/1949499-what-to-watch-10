import './error.css';

function ServerErrorScreen() : JSX.Element{
  return (
    <section className="error">
      <p>Server error :(</p>
      <p>Try again later</p>
    </section>
  );
}

export default ServerErrorScreen;
