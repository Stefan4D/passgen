import logo from "./logo.svg";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Password Generator</p>
      </header>
      <PasswordGenerator />
    </div>
  );
}

export default App;
