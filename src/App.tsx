import "./App.css";

function App() {
  const appEnvironment: string = import.meta.env.VITE_TESTING ?? "localhost";

  const articles = [...new Array(15)];

  console.log(appEnvironment);

  return (
    <div className="container">
      <header>Header</header>
      <main>
        <aside>Side bar</aside>
        <section>
          {articles.map((_, index) => (
            <article key={index}>
              <div className="card-img"></div>
              <div className="card-content">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
