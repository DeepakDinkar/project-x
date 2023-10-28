import "./App.css";

function App() {
  const appEnvironment: string = import.meta.env?.TESTING ?? "localhost";

  return (
    <div className="wrapper">
      Environment: <span>{appEnvironment}</span>
    </div>
  );
}

export default App;
