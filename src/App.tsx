import "./App.css";

function App() {
  const appEnvironment: string = import.meta.env.VITE_TESTING ?? "localhost";

  console.log(import.meta.env);

  return (
    <div className="wrapper">
      Environment: <span>{appEnvironment}</span>
    </div>
  );
}

export default App;
