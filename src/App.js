import logo from "./logo.svg";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <p>Password Generator</p>
        </header>
        <PasswordGenerator />
      </div>
    </ChakraProvider>
  );
}

export default App;
